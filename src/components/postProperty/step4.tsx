import PhotoViewer from "../common/photoViewer";
import DynamicSelect from "../common/select";
import ImageUpload from "../common/upload";
import FieldLabel from "./fieldLabel";

export default function Step4() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
        Amenities & Description
      </p>

    <div>
      <FieldLabel label="Add Property Photos"/>
      <FieldLabel label="Upload clear images to attract more buyers or tenants." customClass="text-text-gray font-normal! text-xs!"/>
    </div>
    <div className="flex flex-wrap gap-3">
        <div className="min-w-[230px] flex-1">
        <ImageUpload onUpload={() => {}} accept={''} label={''}/>
        </div>
            <div className="flex-1 min-w-[230px]">
        <PhotoViewer type='photo'/>

            </div>
            <div className="flex-1 min-w-[230px]">
        <PhotoViewer type='photo'/>

            </div>
    </div>

    <div>
      <FieldLabel label="Add Property Videos"/>
      <FieldLabel label="Add a walkthrough video to give buyers a better view of your property." customClass="text-text-gray font-normal! text-xs!"/>
    </div>
    <div className="flex flex-wrap gap-3">
        <div className="min-w-[230px] flex-1">
        <ImageUpload onUpload={() => {}} accept={''} label={''}/>
        </div>
            <div className="flex-1 min-w-[230px]">
        <PhotoViewer type='video'/>

            </div>
            <div className="flex-1 min-w-[230px]">
        <PhotoViewer type='video'/>

            </div>
    </div>
      </div>
  )
}