import { useState } from "react";
import { supabase } from "./SupabaseClient";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileURL, setFileURL] = useState("");

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            setUploading(true);

            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { data, error } = await supabase.storage
                .from("Forum-pics")
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            const { data: url } = await supabase.storage
                .from("Forum-pics")
                .getPublicUrl(filePath);

            console.log(url.publicUrl);

            setFileURL(url.publicUrl);
            alert("File uploaded successfully.");
        } catch (error) {
            alert("Error uploading file:", error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {fileURL && (
                <div>
                    <p>File uploaded to: {fileURL}</p>
                    <img src={fileURL} alt="Uploaded file" style={{ width: "300px", height: "auto" }} />
                </div>
            )}
        </div>
    );
};

export default FileUpload;