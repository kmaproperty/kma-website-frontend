import { Radio } from "@mui/material";
import Image from "next/image";
import DynamicSelect from "../select";

export default function PhotoViewer({type} : {type: string}){
    return(
        <div className="relative flex-1 rounded-[10px]">
            <Image alt='photo' src='/assets/sample-image.png' width={120} height={100} className="rounded-[10px] w-full h-38"/>
            {type == 'photo' && <div className="absolute top-0 p-2 w-full flex h-full flex-col justify-between">
                <div className="flex justify-between">
                    <div
                        className={`
                                w-[100px] h-[31px] bg-white flex items-center px-1 rounded-full cursor-pointer transition-all
                                
                            `}
                        >
                        <Radio
                            name="userType"
                            disableRipple
                            disableFocusRipple
                            disableTouchRipple
                            sx={{
                            padding: {
                                xs: "2px",
                                sm: "3px 2px 3px 3px",
                                md: "4px 4px 4px 4px",
                            },
                            color: "var(--color-text-black)",
                            "& .MuiSvgIcon-root": {
                                fontSize: 20,
                            },
                    
                            "&.Mui-checked": {
                                color: "var(--color-text-black)",
                                '& [data-testid="RadioButtonCheckedIcon"]': {
                                transform: "scale(1.3)",
                                },
                            },
                        
                            }}
                        />
                        <span>{'Cover'}</span>
                    </div>
                    <div className="bg-white rounded-full w-[31px] h-[31px] flex justify-center items-center ">
                        <Image alt='delete' src='/assets/delete.svg' width={16} height={16} />
                    </div>
                </div>
                <div className="flex justify-end">
                <div className="w-[150px]">
                    <DynamicSelect minHeight={'30px'} options={[{label: 'Living Room', value: 'Living Room'}, {label: 'Servent Room', value: 'Servent Room'},{label: 'Pooja Room', value: 'Pooja Room'},{label: 'Bedroom', value: 'Bedroom'}]}/>
                </div>

                </div>
                
            </div>}
            {type == 'video' && <>
            <div className="absolute top-0 p-2 w-full flex h-full justify-end">
                <div className="bg-white rounded-full w-[31px] h-[31px] flex justify-center items-center ">
                        <Image alt='delete' src='/assets/delete.svg' width={16} height={16} />
                    </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#01004866]">
                        <div className="flex items-center justify-center rounded-full w-10 h-10 bg-blue">
                            <Image alt='play' src='/assets/play-white.svg' width={16} height={16} />
                        </div>
                    </div>
            </div>
            </>}
        </div>
    )
}