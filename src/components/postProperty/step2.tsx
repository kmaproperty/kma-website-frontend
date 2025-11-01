import { InputBase } from "@mui/material";
import DynamicAsyncSelect from "../common/asyncSelect";
import FieldLabel from "./fieldLabel";
import ChipTag from "../common/chipTag";
import DynamicInput from "../common/dynamicInputLeft";

export default function Step2() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
        Property Details
      </p>

      <div className="flex flex-col pb-3">
        <div className="flex items-center gap-2">
          <div className=" border-r-3 border-text-blue rounded-r-[10px] h-[23px]"></div>
          <p className="text-text-black font-semibold text-base 2md:text-lg ">
            Floor Details
          </p>
        </div>

        <p className="text-sm text-text-gray pt-1">
          Total no of floors and your floor details
        </p>
      </div>

      <div className="grid grid-cols-1 2md:grid-cols-2 gap-3">
        <div>
          <FieldLabel label="Total Floor Count" customClass="pb-2" />
          <InputBase
            placeholder="Enter total floor count"
            fullWidth
            value={""}
            onChange={(e) => {}}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
        </div>
        <div>
          <FieldLabel
            label="Property on Floor / Floor Number"
            customClass="pb-2"
          />
          <InputBase
            placeholder="Select property on Floor"
            fullWidth
            value={""}
            onChange={(e) => {}}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Tower / Block No (Optional)" customClass="pb-2" />
        <InputBase
          placeholder="Enter tower / block no."
          fullWidth
          value={""}
          onChange={(e) => {}}
          className={
            "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
          }
          inputProps={{
            className: "placeholder-gray",
          }}
        />
      </div>

      <div>
        <FieldLabel label="Flat Number" customClass="pb-2" />
        <InputBase
          placeholder="Enter flat number"
          fullWidth
          value={""}
          onChange={(e) => {}}
          className={
            "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
          }
          inputProps={{
            className: "placeholder-gray",
          }}
        />
      </div>

      <div>
        <FieldLabel label="Property Area (Acres)" customClass="pb-2" />
        <InputBase
          placeholder="Acres "
          fullWidth
          value={""}
          onChange={(e) => {}}
          className={
            "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
          }
          inputProps={{
            className: "placeholder-gray",
          }}
        />
      </div>

      <div className="flex flex-col pt-3 pb-3">
        <div className="flex items-center gap-2">
          <div className=" border-r-3 border-text-blue rounded-r-[10px] h-[23px]"></div>
          <p className="text-text-black font-semibold text-base 2md:text-lg ">
            Rent Details
          </p>
        </div>

        <p className="text-sm text-text-gray pt-1">Rent details</p>
      </div>

      <div>
        <FieldLabel label="Rent Suitable For/ Preferred Tenant Type" />
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={false}
            label="Family"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Bachelors"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={false}
            label="Company"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Select your preference for bachelors" />
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={false}
            label="Open for both"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Men Only"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={false}
            label="Women Only"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
        </div>
      </div>
      <div>
        <FieldLabel label="Rent Available From" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={false}
            label="Immediately"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Later"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Possession Date" />
        <div className="flex gap-3 pt-2">
          <InputBase
            placeholder="Possession Date (Calendar)  "
            type="date"
            fullWidth
            onChange={(e) =>
            {}
            }
            value={''}
            className={'2md:w-[40%]! box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]'}
            inputProps={{
            className: "placeholder-gray",
            }}
        />
        </div>
      </div>

      <div>
        <FieldLabel label="Rent" customClass="pb-2"/>
        <DynamicInput placeHolder="Enter rent"/>
      </div>

      <div>
        <FieldLabel label="Maintenance Charges" required={true}/>
        <div className="flex flex-wrap gap-3 py-2">
          <ChipTag
            checked={false}
            label="Include in rent"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Separate"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
          />
        </div>
        <DynamicInput placeHolder="Maintenance Charges"/>
      </div>

      <div>
        <FieldLabel label="Security Deposit" required={true}/>
        <div className="flex flex-wrap gap-3 py-2">
          <ChipTag
            checked={false}
            label="None"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="1 month"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="2 month"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Custom"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
        </div>
        <DynamicInput placeHolder="Brokerage (in Rupees)"/>

      </div>

       <div>
        <FieldLabel label="Lock-in Period" required={true}/>
        <div className="flex flex-wrap gap-3 py-2">
          <ChipTag
            checked={false}
            label="None"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="1 month"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="6 month"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Custom"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
        </div>
        <InputBase
          placeholder="Enter month"
          fullWidth
          value={""}
          onChange={(e) => {}}
          className={
            "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
          }
          inputProps={{
            className: "placeholder-gray",
          }}
        />
        
      </div>

      <div>
        <FieldLabel label="Do you charge brokerage?" required={true}/>
        <div className="flex flex-wrap gap-3 py-2">
          <ChipTag
            checked={false}
            label="Yes"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="No"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
          />
        </div>  
        
      </div>
      <hr className="text-[#D9D9D9]"></hr>
    </div>
  );
}
