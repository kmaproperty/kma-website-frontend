import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { InputBase } from "@mui/material";
import MobileInput from "../common/mobileInput";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { mobileNumberValidator } from "@/lib/commonValidator";
import { useMutation } from "@tanstack/react-query";
import { ContactDetailsPayload, ContactDetailsResponse, CreateContactDetailsApiHandler } from "@/services/userService";
import { toast } from "react-toastify";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: {value: string, code: string};
  about: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactInformation() {
   const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter()
    const isContactInformation = searchParams.get('isContactInformation')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = React.useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: {code: '+91', value: ''},
    about: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (formData.email.trim() && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    let msg = mobileNumberValidator(formData.phone.value)
    if(msg){
      newErrors.phone = msg
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = React.useCallback((field: keyof FormValues, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }, []);

      const handleMobileInputChange = (value: string, code: string) => {
        const msg = errors.phone ? mobileNumberValidator(value) : ''
        setFormData({...formData, phone: {value: value, code: code}})
        setErrors({...errors, phone: msg})
      }

   const handleClose: DialogProps["onClose"] = (event, reason) => {
      if (reason === "backdropClick" || reason === "escapeKeyDown") return;
       router.push(`${pathname}`);
    };

  const openPopup = React.useMemo(() => {
      return isContactInformation == 'true' ? true : false
    }, [isContactInformation])

     const {
      mutate: submitContactDetails,
      isPending,
    } = useMutation({
      mutationFn: async (payload: ContactDetailsPayload): Promise<ContactDetailsResponse> => {
        return await CreateContactDetailsApiHandler(payload);
      },
      onSuccess: (response: ContactDetailsResponse) => {
        console.log('response', response)
        debugger
        toast.success(response.message)
        router.push(`${pathname}`);
      },
      onError: (error: any) => {
        if(Array.isArray(error.message)){
          error.messge.map((item: string) => {
            toast.success(item)
          })
        }else{
          toast.success(error.message)
        }
      },
    });

  const handleContactInformation = () => {
    if(validate()){
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phone.value,
          message: formData.about, 
          email: formData.email,
        }
        submitContactDetails(payload)
    }
  }
  
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
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openPopup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: fullScreen ? '' : "1rem", 
              overflow: 'hidden'
            },
          },
        }}
      >
        <DialogContent sx={{ padding: "0px" }}>
          
          <div className="grid md:grid-cols-[40%_60%] grid-cols-1 h-full w-full p-2.5">
            {/* Left Side: Contact Info */}
            <div className="bg-blue text-white p-8 relative rounded-xl z-10">
              <h2 className="text-xl 2xl:text-2xl font-semibold mb-2">
                Contact Information
              </h2>
              <p className="text-base mb-6">
                Say something to start a live chat!
              </p>

              <div className="space-y-6 z-10 relative">
                {/* Content stays in z-10 */}
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-white p-2">
                    <Image
                      alt="phone"
                      src="/assets/phone-white.svg"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className="text-base">+00 (123) 456 789 012</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-white p-2">
                    <Image
                      alt="email"
                      src="/assets/email-white.svg"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className="text-base">infomail123@domain.com</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-white p-2">
                    <Image
                      alt="location"
                      src="/assets/location-white.svg"
                      width={29}
                      height={29}
                    />
                  </div>
                  <p className="text-base">
                    West 2nd lane, Inner circular road, New York City
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-3 flex w-full md:hidden justify-end ">
                <Image src='/assets/close-icon-white.svg' alt='close' width={24} height={24} className="cursor-pointer"/>
              </div>
              {/* Background Circles (z-0) */}
              <div className="absolute bottom-[8%] right-[13%] w-28 h-28 z-1">
                <Image
                  alt="round-ring"
                  src="/assets/contactInfor-small-round.svg"
                  className="w-28 h-28"
                  width={50}
                  height={50}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 z-0 overflow-hidden">
                <Image
                  alt="round-ring"
                  src="/assets/contactInfo-big-round.svg"
                  className="w-36 h-36"
                  width={50}
                  height={50}
                />
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white pl-4 pr-2">
              <div className="hidden w-full md:flex justify-end">
              <Image src='/assets/close-icon.svg' alt='close' width={24} height={24} className="cursor-pointer"/>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 md:pt-0">
                  <div>
                    <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black pb-2">
                      First Name
                    </p>
                    <div>
                    <InputBase
                      placeholder="Enter your name"
                      fullWidth
                      className={dynamicClass(errors.firstName)}
                      // className="box-border h-[47.81px] px-4 py-2 text-text-gray text-sm rounded-full border border-border focus:outline-none focus:border-blue"
                      inputProps={{
                        className: "placeholder-gray",
                      }}
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                    {errors.firstName && (
                    <p className="pt-1 text-red-500 text-xs">
                      {errors.firstName}
                    </p>
                  )}
                  </div>
                  </div>
                  <div>
                    <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black pb-2">
                      Last Name
                    </p>
                    <div>
                    <InputBase
                      placeholder="Enter your name"
                      fullWidth
                      className={dynamicClass(errors.lastName)}
                      // className="box-border h-[47.81px] px-4 py-2 text-text-gray text-sm rounded-full border border-border focus:outline-none focus:border-blue"
                      inputProps={{
                        className: "placeholder-gray",
                      }}
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                    {errors.lastName && (
                    <p className="pt-1 text-red-500 text-xs">
                      {errors.lastName}
                    </p>
                  )}
                  </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <p className="text-sm lg:text-base 2xl:text-lg text-text-black pb-2">
                      Email Address
                    </p>
                    <>
                    <InputBase
                      placeholder="Enter email address"
                      fullWidth
                      // className="box-border h-[47.81px] px-4 py-2 text-text-gray text-sm rounded-full border border-border focus:outline-none focus:border-blue"
                      className={dynamicClass(errors.email)}
                      inputProps={{
                        className: "placeholder-gray",
                      }}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && (
                    <p className="pt-1 text-red-500 text-xs">
                      {errors.email}
                    </p>
                  )}
                  </>
                  </div>
                  <div>
                    <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black pb-2">
                      Phone Number
                    </p>
                    <MobileInput required={true} validationMessage={errors.phone} value={formData.phone.value} countryCode={formData.phone.code} onChange={handleMobileInputChange}/>
                  </div>
                </div>

                <div>
                  <p className="text-sm lg:text-base 2xl:text-lg text-text-black pb-2">
                    Message
                  </p>
                  <InputBase
                    placeholder="Write your message"
                    multiline
                    fullWidth
                    minRows={3}
                    className="box-border text-sm text-text-gray rounded-xl border border-border focus:outline-none focus:border-blue"
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: "1rem",
                      },
                    }}
                    value={formData.about}
                    onChange={(e) => handleChange("about", e.target.value)}
                  />
                </div>

                <div className="flex justify-end flex-row gap-4 items-center">
                  <button disabled={isPending} onClick={handleContactInformation} className="w-auto animated-button px-12 py-3 border border-blue text-center cursor-pointer">
                    <span className="gap-3 relative">
                      <p className="text-nowrap">Send Message</p>
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full flex ">
                <Image
                  src="/assets/send.svg"
                  alt="Paper Plane"
                  width={40}
                  height={40}
                  className="w-full h-[120px]"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
