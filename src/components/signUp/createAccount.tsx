"use client";
import { InputBase } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { OptionType } from "../common/asyncSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LIST_TYPE, USER_TYPE } from "@/lib/enums";
import {
  createChannelPartnerApiHandler,
  CreateChannelPartnerPayload,
  createOwnerApiHandler,
  CreateOwnerPayload,
  CreateOwnerResponse,
  User,
} from "@/services/authService";
import AsyncSelectDropdown from "../common/asyncSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CitiesResponse, getCityApiHandler } from "@/services/masterService";
import { MultiValue } from "react-select";
import { ListType } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setFormField } from "@/store/createAccountSlice";
import { RootState } from "@/store/store";
import { createURLSearchParam } from "@/lib/helper";
import { toast } from "react-toastify";

interface FormData {
  fullName: string;
  email: string;
  partnerCode: string;
  city: OptionType | MultiValue<OptionType> | null;
  businessSince: string;
  firmName: string;
  about: string;
}

interface FormErrors {
  [key: string]: string;
}


export default function CreateAccount({ step }: { step: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dateRef = useRef<HTMLInputElement | null>(null)
  // const ownerType = searchParams.get('ownerType')
  const propertyIntent = searchParams.get("propertyIntent");
  const [userData, setUserData] = useState<User | null>(null);

  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  // const [step, setStep] = useState<number>(1); // 1 = initial, 2 = extended
  console.log("data", formData);
  const { data } = useQuery<CitiesResponse, Error, string[]>({
    queryKey: ["cities"],
    queryFn: getCityApiHandler,
    select: (response: CitiesResponse) => {
      return response.data;
    },
  });

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    dispatch(setFormField({ key: field, value }));
    setFormErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  }, []);
  const validateStep = useCallback(() => {
    const errors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Invalid email format";
      }
      
      if (userData?.role == USER_TYPE.OWNER) {
        if (
          (Array.isArray(formData.city) && formData.city.length == 0) ||
          !formData.city
        ) {
          errors.city = "City is required";
        }
      }
      if (userData?.role == USER_TYPE.CHANNEL_PARTNER) {
        if (!formData.partnerCode.trim())
          errors.partnerCode = "Partner code is required";
      }
    }

    if (step === 2) {
      if (
        (Array.isArray(formData.city) && formData.city.length == 0) ||
        !formData.city
      ) {
        errors.city = "City is required";
      }
      if (!formData.businessSince)
        errors.businessSince = "Business since is required";
      if (!formData.firmName.trim()) errors.firmName = "Firm name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, step, userData,formErrors]);

  const handleNextStep = () => {
    if (validateStep()) {
      // setStep(2);
      router.push("/additional-details");
    }
  };

  const { mutate: handleOwnerCreate, isPending: ownerLoader } = useMutation({
    mutationFn: async (
      payload: CreateOwnerPayload
    ): Promise<CreateOwnerResponse> => {
      return await createOwnerApiHandler(payload);
    },
    onSuccess: (response: CreateOwnerResponse) => {
      console.log("create owner response", response);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(resetForm())
      toast.success(response.message)
      router.replace('/post-property')
    },
    onError: (error: any) => {
      console.log("owner create error", error);
      if(Array.isArray(error.message)){
        error.message.map((item: string) => {
          toast.error(item)
        })
      }else{
        toast.error(error.message)
      }
    },
  });

  const {
    mutate: handleChannelPartnerCreate,
    isPending: channelPartnerLoader,
  } = useMutation({
    mutationFn: async (
      payload: CreateChannelPartnerPayload
    ): Promise<CreateOwnerResponse> => {
      return await createChannelPartnerApiHandler(payload);
    },
    onSuccess: (response: CreateOwnerResponse) => {
      console.log("create owner response", response);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(resetForm())
      toast.success(response.message)
      router.push('/post-property')
    },
    onError: (error: any) => {
      console.log("owner create error", error);
      if(Array.isArray(error.message)){
        error.message.map((item: string) => {
          toast.error(item)
        })
      }else{
        toast.error(error.message)
      }
    },
  });

  const handleSubmit = () => {
    if (userData?.role == USER_TYPE.OWNER) {
      if (validateStep()) {
        const payload = {
          name: formData.fullName,
          email: formData.email,
          intent: (propertyIntent ?? LIST_TYPE.SELL) as ListType,
          phone: userData.phone,
        };
        handleOwnerCreate(payload);
      }
    } else {
      if (step == 1) {
        handleNextStep();
      } else if (validateStep()) {
        const payload = {
          name: formData.fullName,
          email: formData.email,
          channelPartnerCode: formData.partnerCode,
          firmName: formData.firmName,
          businessSince: formData.businessSince,
          cities: Array.isArray(formData.city)
            ? formData.city.map((item) => item.value).join("")
            : "",
          aboutYourSelf: formData.about,
          intent: (propertyIntent ?? LIST_TYPE.SELL) as ListType,
          phone: userData?.phone ?? "",
        };
        handleChannelPartnerCreate(payload);
      }
    }
  };

  const loadCities = async (input: string) => {
    let filteredData = data ? data.filter((opt) => opt.toLowerCase().includes(input.toLowerCase())) : []
    let updatedOptions = filteredData.map(item => ({label: item, value: item}))
    return updatedOptions
  };

  const handleRedirectToLogin = () => {
      const params = createURLSearchParam({
        isLogin: true
      })
      router.push(`${pathname}${params}`);
    }

    
  const handleRedirectCode = () => {
    const params = createURLSearchParam({
        isContactInformation: true
      })
      router.push(`${pathname}${params}`);
  }

  useEffect(() => {
    let user = localStorage.getItem("user");
    const userData: User = user ? JSON.parse(user) : null;
    if (!userData) {
      router.push("/signup");
      return;
    }
    setUserData(userData);
  }, []);

  const dynamicClass = (flag: string) => {
    return `
                  box-border h-[47.81px] px-4 py-2 text-sm rounded-full 
                  border focus:outline-none
                  ${
                    Boolean(flag)
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-blue"
                  }
                  text-text-gray
                `;
  };
  return (
    <div
      className="bg-white relative w-full md:min-w-96 h-auto rounded-b-xl rounded-tr-xl"
      style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: "11" }}
    >
      <div className="absolute rounded-full w-[90%] -top-[32px] rounded-[100px] bg-white h-[60px]"></div>
      <div className="pt-4 px-5">
        <div className="relative flex flex-wrap w-[90%] -top-[35px] text-sm gap-4 bg-white px-2 rounded-full">
          <p className="text-text-black font-semibold text-base lg:text-lg 1xl:text-xl">
            Create Your Account
          </p>
        </div>
        <div className="relative -top-[35px] px-2 flex flex-col gap-6  md:gap-8 w-full">
          <p className="text-sm 1xl:text-base  text-text-gray">
            Create your free account and get started
          </p>
          <div className="flex flex-col gap-3">
            {step == 1 && (
              <>
                <p className="required-label text-sm 1xl:text-base text-text-black">
                  Full Name
                </p>
                <div>
                  <InputBase
                    placeholder="Enter your full name"
                    fullWidth
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    value={formData.fullName}
                    className={dynamicClass(formErrors.fullName)}
                    inputProps={{
                      className: "placeholder-gray",
                    }}
                  />
                  {formErrors.fullName && (
                    <p className="pt-1 text-red-500 text-xs">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                <p className="required-label text-sm 1xl:text-base text-text-black">
                  Email Address
                </p>
                <div>
                  <InputBase
                    placeholder="Enter your email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={dynamicClass(formErrors.email)}
                    inputProps={{
                      className: "placeholder-gray",
                    }}
                  />
                  {formErrors.email && (
                    <p className="pt-1 text-red-500 text-xs">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                {userData?.role == USER_TYPE.OWNER && step == 1 && (
                  <>
                    <p className="required-label text-sm 1xl:text-base text-text-black">
                      City
                    </p>
                    <div>
                      <AsyncSelectDropdown
                        isMulti={false}
                        isError={Boolean(formErrors.city)}
                        placeholder="Start Typing..."
                        onChange={(value) => {
                          dispatch(setFormField({ key: "city", value }));

                          setFormErrors({ ...formErrors, city: "" });
                        }}
                        loadOptions={loadCities}
                        value={formData.city}
                      />
                      {formErrors.city && (
                        <p className="pt-1 text-red-500 text-xs">
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
            {userData?.role == USER_TYPE.CHANNEL_PARTNER && (
              <>
                {step == 1 && (
                  <>
                    <p className="required-label text-sm 1xl:text-base text-text-black">
                      Channel Partner Code
                    </p>
                    <div>
                      <InputBase
                        placeholder="Enter code"
                        fullWidth
                        value={formData.partnerCode}
                        onChange={(e) =>
                          handleChange("partnerCode", e.target.value)
                        }
                        className={dynamicClass(formErrors.partnerCode)}
                        inputProps={{
                          className: "placeholder-gray",
                        }}
                      />
                      {formErrors.partnerCode && (
                        <p className="pt-1 text-red-500 text-xs">
                          {formErrors.partnerCode}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {step == 2 && (
                  <>
                    <p className="required-label text-sm 1xl:text-base text-text-black">
                      City
                    </p>
                    <div>
                      <AsyncSelectDropdown
                        isMulti={true}
                        isError={Boolean(formErrors.city)}
                        placeholder="Start Typing..."
                        onChange={(value) => {
                          dispatch(setFormField({ key: "city", value }));
                          setFormErrors({ ...formErrors, city: "" });
                        }}
                        value={formData.city}
                        loadOptions={loadCities}
                      />
                      {formErrors.city && (
                        <p className="pt-1 text-red-500 text-xs">
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                    <p className="required-label text-sm 1xl:text-base text-text-black">
                      In Bussiness Since
                    </p>
                    <div onClick={() => {dateRef.current?.showPicker()}}>
                      <InputBase
                        inputRef={dateRef}
                        placeholder="Selct"
                        type="date"
                        fullWidth
                        onChange={(e) =>
                          handleChange("businessSince", e.target.value)
                        }
                        value={formData.businessSince}
                        className={dynamicClass(formErrors.businessSince)}
                        inputProps={{
                          className: "placeholder-gray",
                        }}
                      />
                      {formErrors.businessSince && (
                        <p className="pt-1 text-red-500 text-xs">
                          {formErrors.businessSince}
                        </p>
                      )}
                    </div>
                    <p className="required-label text-sm 1xl:text-base text-text-black">
                      Firm Name
                    </p>
                    <div>
                      <InputBase
                        placeholder="Enter firm name"
                        fullWidth
                        value={formData.firmName}
                        onChange={(e) =>
                          handleChange("firmName", e.target.value)
                        }
                        className={dynamicClass(formErrors.firmName)}
                        inputProps={{
                          className: "placeholder-gray",
                        }}
                      />
                      {formErrors.firmName && (
                        <p className="pt-1 text-red-500 text-xs">
                          {formErrors.firmName}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-sm 1xl:text-base text-text-black">
                      About Your Self
                    </p>
                    <InputBase
                      placeholder="Description..."
                      multiline
                      fullWidth
                      minRows={4}
                      value={formData.about}
                      onChange={(e) => handleChange("about", e.target.value)}
                      className="box-border text-sm text-text-gray rounded-xl border border-border focus:outline-none focus:border-blue"
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "1rem",
                        },
                      }}
                    />
                  </>
                )}
                {userData?.role == USER_TYPE.CHANNEL_PARTNER && step == 1 && (
                  <p className="text-sm 1xl:text-base text-text-gray">
                    Channel partner code{" "}
                    <span onClick={handleRedirectCode} className="text-sm 1xl:text-base font-semibold underline text-text-black cursor-pointer">
                      Click Here
                    </span>{" "}
                    to get help from our support team.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="flex justify-start flex-col md:flex-row gap-4 items-center">
            <button
              disabled={ownerLoader || channelPartnerLoader}
              onClick={handleSubmit}
              className="w-full md:w-auto text-sm 1xl:text-base animated-button px-12 py-3 border border-blue text-center cursor-pointer"
            >
              <span className="gap-3 relative">
                <p className="text-nowrap">
                  {USER_TYPE.CHANNEL_PARTNER == userData?.role
                    ? step == 1
                      ? "Next"
                      : "Create Account"
                    : "Create Account"}
                </p>
              </span>
            </button>
            {/* <p className="flex-1 text-sm lg:text-sm 2xl:text-lg text-text-gray">
              Already have an account?{" "}
              <span onClick={handleRedirectToLogin} className="text-sm lg:text-sm 2xl:text-lg font-semibold underline text-text-black cursor-pointer">
                Login Here
              </span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
