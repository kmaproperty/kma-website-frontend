"use client";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

const mediaTypeOptions = [
  { value: "photo", label: "Photo" },
  { value: "video", label: "Video" },
];

const viewOptions = [
  { value: "Living Room", label: "Living Room" },
  { value: "Bedroom", label: "Bedroom" },
  { value: "Kitchen", label: "Kitchen" },
];

export default function VerifyProperty() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [showCameraHelp, setShowCameraHelp] = useState(false);
  const [showLocationHelp, setShowLocationHelp] = useState(false)
  const [locationGranted, setLocationGranted] = useState(false);
  const [cameraGranted, setCameraGranted] = useState(false);
  const [coords, setCoords] = useState(null);

  const [stream, setStream] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [capturedBlob, setCapturedBlob] = useState(null);

  const [selectedView, setSelectedView] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  /* ---------------- LOCATION ---------------- */
const requestLocation = async () => {
    if (!navigator.geolocation) {
        alert(`Geolocation not supported`);
        return;
    }
    
    try {
        const permission = await navigator.permissions.query({
            name: "geolocation",
        });
        
        if (permission.state != "granted") {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
            alert(`Geolocation not supported ${pos.coords.latitude}`);
            
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLocationGranted(true);
        },
        () => {
          setLocationGranted(false);
        }
      );
    } else {
      // Permission is denied
      setShowLocationHelp(true);
    }
  } catch {
    // Fallback (older Safari)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLocationGranted(true);
      },
      () => setShowLocationHelp(true)
    );
  }
};


  /* ---------------- CAMERA ---------------- */
  const requestCamera = async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Camera not supported");
    return;
  }

  try {
    // Try permission API (Chrome, Edge, Firefox)
    if (navigator.permissions) {
      const permission = await navigator.permissions.query({
        name: "camera",
      });

      if (permission.state === "denied") {
        setShowCameraHelp(true);
        return;
      }
    }

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setStream(mediaStream);
    setCameraGranted(true);
    videoRef.current.srcObject = mediaStream;
  } catch (err) {
    // Covers Safari + manual denial
    setShowCameraHelp(true);
  }
};


  /* ---------------- PHOTO ---------------- */
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      setCapturedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    }, "image/jpeg");
  };

  /* ---------------- VIDEO ---------------- */
  const startRecording = () => {
    setChunks([]);
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) =>
      e.data.size && setChunks((prev) => [...prev, e.data]);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      setCapturedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  /* ---------------- SAVE ---------------- */
  const saveMedia = () => {
    const fileKey = `uploads/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

    if (mediaType.value === "photo") {
      setPhotos((p) => [
        ...p,
        { fileKey: fileKey + ".jpg", view: selectedView?.value },
      ]);
    } else {
      setVideos((v) => [...v, { fileKey: fileKey + ".mp4", format: "mp4" }]);
    }

    setPreviewUrl(null);
    setCapturedBlob(null);
    setSelectedView(null);
  };

  /* ---------------- FINAL SUBMIT ---------------- */
  const submitAll = () => {
    const payload = {
      verificationToken: "abc123def456",
      livePhotos: photos,
      liveVideos: videos,
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    console.log(payload);
    alert("Submitted – check console");
  };

  useEffect(() => {
  const checkPermissions = async () => {
    try {
      /* -------- LOCATION -------- */
      if (navigator.permissions) {
        const locationPermission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (locationPermission.state != "granted") {
          navigator.geolocation.getCurrentPosition((pos) => {
            setCoords({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
            setLocationGranted(true);
          });
        }
      }

      /* -------- CAMERA -------- */
      if (navigator.permissions) {
        const cameraPermission = await navigator.permissions.query({
          name: "camera",
        });

        if (cameraPermission.state === "granted") {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setStream(mediaStream);
          setCameraGranted(true);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        }
      }
    } catch (err) {
      // Safari fallback (no permissions API)
      // Do nothing → user will see Allow screens
    }
  };

  checkPermissions();
}, []);

  /* ---------------- PERMISSION SCREENS ---------------- */
  if (!locationGranted) {
    return (
        <>
      <PermissionScreen
        title="Allow Location"
        description="Location is required to verify property"
        action={requestLocation}
      />
      {showLocationHelp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-xl p-6 max-w-sm text-center space-y-4">
            <h3 className="text-lg font-semibold">Location Required</h3>
            <p className="text-sm text-gray-600">
                Location access is blocked. Please enable it from your browser
                settings to continue.
            </p>

            <ul className="text-left text-sm text-gray-500 space-y-1">
                <li>• Tap the 🔒 lock icon in the address bar</li>
                <li>• Enable Location access</li>
                <li>• Refresh the page</li>
            </ul>

            <button
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-light-purple text-text-black cursor-pointer rounded-lg"
            >
                Refresh Page
            </button>
            </div>
        </div>
        )}
      </>
    );
  }

  if (!cameraGranted) {
    return (
        <>
        <p>{coords.latitude} {coords.longitude}</p>
      <PermissionScreen
        title="Allow Camera"
        description="Camera access is required"
        action={requestCamera}
      />
      {showCameraHelp && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center space-y-4">
      <h3 className="text-lg font-semibold">Camera Access Required</h3>

      <p className="text-sm text-gray-600">
        Camera access is blocked. Please enable it in your browser settings
        to continue verification.
      </p>

      <div className="text-left text-sm text-gray-500 space-y-1">
        <p>Steps to allow:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Tap the 🔒 lock icon in address bar</li>
          <li>Enable <b>Camera</b> permission</li>
          <li>Refresh the page</li>
        </ul>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium"
      >
        Refresh Page
      </button>
    </div>
  </div>
)}

      </>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold text-center">
        Property Verification
      </h1>

      <Select
        placeholder="Select Media Type"
        options={mediaTypeOptions}
        value={mediaType}
        onChange={setMediaType}
      />

      {mediaType && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-xl border"
          />

          {mediaType.value === "photo" && (
            <button onClick={capturePhoto} className="btn-primary">
              Capture Photo
            </button>
          )}

          {mediaType.value === "video" && (
            <>
              {!recording ? (
                <button onClick={startRecording} className="btn-primary">
                  Start Recording
                </button>
              ) : (
                <button onClick={stopRecording} className="btn-danger">
                  Stop & Save
                </button>
              )}
            </>
          )}
        </>
      )}

      {previewUrl && (
        <div className="space-y-3">
          {mediaType.value === "photo" ? (
            <img src={previewUrl} className="rounded-xl" />
          ) : (
            <video src={previewUrl} controls className="rounded-xl" />
          )}

          {mediaType.value === "photo" && (
            <Select
              placeholder="What is this photo for?"
              options={viewOptions}
              value={selectedView}
              onChange={setSelectedView}
            />
          )}

          <button onClick={saveMedia} className="btn-primary">
            Upload
          </button>
        </div>
      )}


      <MediaList title="Uploaded Photos" items={photos} />
      <MediaList title="Uploaded Videos" items={videos} />

      <button
        disabled={!photos.length && !videos.length}
        onClick={submitAll}
        className="btn-submit"
      >
        Final Submit
      </button>
    </div>
  );


}

/* ---------------- COMPONENTS ---------------- */

const PermissionScreen = ({ title, description, action }) => (
  <div className="h-screen flex flex-col justify-center items-center p-6 text-center space-y-4">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <p className="text-gray-600">{description}</p>
    <button
      className="cursor-pointer w-full md:w-[130px] px-12 py-3 animated-button border border-blue"
      onClick={action}
    >
      <span className="gap-3 relative flex justify-center">
        <p className={`text-nowrap`}>Allow</p>
      </span>
    </button>
  </div>
);

const MediaList = ({ title, items }) => (
  <div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="space-y-2">
      {items.map((i, idx) => (
        <div key={idx} className="p-2 border rounded text-sm text-gray-600">
          {i.fileKey}
        </div>
      ))}
    </div>
  </div>
);
