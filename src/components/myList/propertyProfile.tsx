"use client";
import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import styled from "@emotion/styled";
import { getPropertyDetailsApiHandler, GetPropertyDetailsResponse } from "@/services/postProperty";
import { useQuery } from "@tanstack/react-query";
import VideoPreviewDialog from "../common/videoPreview";
import { getStatusLabel } from "@/lib/helper";
import { useRouter } from "next/navigation";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#A6A6A67D",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
}));

const PropertyView = ({ open, onClose, propertyId }) => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_AWS_URL
  const theme = useTheme();
  const router = useRouter()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openVideoPreview, setOpenVideoPreview] = React.useState(false)
  const [videoPreviewUrl, setVideoPreviewUrl] = React.useState(null)

  const handleClose: DialogProps["onClose"] = (_, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };

  const { data: propertyDetails } = useQuery({
      queryKey: ["property-list", propertyId],
      queryFn: () => {
        return getPropertyDetailsApiHandler(propertyId)
      },
      select: (data: GetPropertyDetailsResponse) =>{
        return data
      },
      enabled: !!propertyId,
      staleTime: 0,
      refetchOnMount: true   
    });

    const handleOpenVideoPreview = (url) => {
        setOpenVideoPreview(true)
        setVideoPreviewUrl(url)
    }

    const handleClosePreview = () => {
        setOpenVideoPreview(false)
        setVideoPreviewUrl(null)
    }

    const handleEdit = () => {
        router.push(`/post-property/${propertyDetails.id}`)
    }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="video-preview-dialog"
      slotProps={{
        paper: {
          sx: {
            borderRadius: fullScreen ? 0 : "1rem",
            overflow: "hidden",
            minWidth: fullScreen ? '100%' : "800px",
          },
        },
      }}
    >
      <DialogContent className="flex flex-col gap-5">
        <div className="flex justify-between w-full">
          <p className="text-blue font-semibold text-base">Property Details</p>
          <Image
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            src="/assets/close-icon.svg"
            alt="close"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <hr className="border-border"></hr>
        <div className="flex flex-col 2md:flex-row flex-wrap justify-between items-start 2md:items-center gap-3">
          <p className="text-text-blue flex-1 font-medium break-all">
            ID: <span className="text-text-gray">{propertyDetails?.id}</span>
          </p>
          <div className="flex flex-1 felx-start w-full 2md:w-[40%] flex-col gap-[2px]">
            <div className="flex justify-between">
            <p className="text-xs lg:text-sm text-text-gray">
              Listing Score
            </p>
            <p className="text-xs lg:text-sm text-text-black">{propertyDetails?.progressPercentage}%</p>
            </div>
            <BorderLinearProgress variant="determinate" value={propertyDetails?.progressPercentage} />
          </div>
          <button className="bg-[#F32B2B1A] text-sm text-[#F32B2B] flex items-center gap-2 px-4 py-2 rounded-[5px] font-medium">
            <img src="/assets/deactivate-eye.svg"></img> Deactivate
          </button>
        </div>
        <div className="flex flex-col 2md:flex-row justify-between items-start 2md:items-center gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-blue">
              {propertyDetails?.title}
            </p>
            <p className="text-text-gray text-sm font-normal">
              United States of America
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={handleEdit} className="cursor-pointer  bg-[#01004833] hover:bg-light-purple text-sm py-2 text-blue flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
              <img src="/assets/edit-blue.svg"></img> Edit Listing
            </button>
            <button className="bg-[#01004833] text-sm text-blue py-2 flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
              <img src="/assets/share-blue.svg"></img> Share
            </button>
            <button className="bg-[#01004833] text-sm text-blue py-2 flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
              <img src="/assets/more-blue.svg"></img>
            </button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3">
            <button className="bg-[#4CAF50] text-sm text-white py-2 flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
              {getStatusLabel(propertyDetails?.status)}
            </button>
            <button className="border border-border text-sm text-text-gray py-2 flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
              {propertyDetails?.area}
            </button>
            <button className="border border-border text-sm text-text-gray py-2 flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
              {propertyDetails?.category}
            </button>
             <button className="border border-border text-sm text-text-gray py-2 flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
              {propertyDetails?.furnishingType}
            </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-3 items-stretch">
            {
                Array.isArray(propertyDetails?.photos) && propertyDetails?.photos.map(item => {
                    return(
                        <div className="relative">
                            <Image
                            src={imageBaseUrl + item.fileKey}
                            alt="property photo"
                            width={600}
                            height={600}
                            className="aspect-video rounded-[5px]"
                            />
                            <p className="bg-[#00000099] text-white text-sm rounded-full absolute bottom-2 px-2 py-0.5 left-2">{item.view}</p>
                        </div>
                    )
                })
            }
          </div>
          <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-3 items-stretch">
            {
                Array.isArray(propertyDetails?.videos) && propertyDetails.videos.map((item) => {
                    return(
                        <div className="relative">
                            <video
                                src={imageBaseUrl + item.fileKey + '?t=5'}
                                className="rounded-[10px] w-full aspect-video"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="flex cursor-pointer items-center justify-center rounded-full w-12 h-12 bg-[#01004866]">
                                    <div onClick={() => {
                                        handleOpenVideoPreview(imageBaseUrl + item.fileKey)
                                    }} className="flex items-center justify-center rounded-full w-10 h-10 bg-blue">
                                    <Image alt="play" src="/assets/play-white.svg" width={16} height={16} />
                                    </div>
                                </div>
                                </div>
                        </div>
                    )
                })
            }
          </div>
        </div>
        <div className="flex flex-wrap flex-row gap-10">
          <div>
            <p className="text-blue font-medium text-lg">{propertyDetails?.price ? 'Price:' : 'Rent:'}</p>
            <p className="text-text-gray text-base">{propertyDetails?.price ?? propertyDetails?.monthlyRent}</p>
          </div>
          {propertyDetails?.possessionDate && <div>
            <p className="text-blue font-medium text-lg">Possession Date:</p>
            <p className="text-text-gray text-base">{propertyDetails?.possessionDate}</p>
          </div>}
          <div>
            <p className="text-blue font-medium text-lg">Created On:</p>
            <p className="text-text-gray text-base">{propertyDetails?.createdOn}</p>
          </div>
          <div>
            <p className="text-blue font-medium text-lg">Last Added:</p>
            <p className="text-text-gray text-base">{propertyDetails?.lastAddedOn}</p>
          </div>
          <div>
            <p className="text-blue font-medium text-lg">Leads</p>
            <p className="text-text-gray text-base">0</p>
          </div>
        </div>
      </DialogContent>
      <VideoPreviewDialog
        open={openVideoPreview}
        videoUrl={videoPreviewUrl}
        onClose={handleClosePreview}
        />
    </Dialog>
  );
};

export default PropertyView;
