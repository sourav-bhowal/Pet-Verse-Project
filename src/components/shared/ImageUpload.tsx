import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { Button } from "../ui/button";

export default function ImageUpload({onUpload} : {onUpload: (url: string) => void}) {
    return (
        <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            onSuccess={(result) => {
                const url = (result.info as CloudinaryUploadWidgetInfo).url;
                onUpload(url);
            }}
        >
            {({ open }) => (
                <Button onClick={() => open?.()} variant="outline">
                    Upload image
                </Button>
            )}
        </CldUploadWidget>
    );
}
