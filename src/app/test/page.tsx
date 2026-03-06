'use client'
import { uploadProjectFile } from "../modules/upload.service"
export default function TestPage() {
    return (
        <div>
            <h1>Test Page</h1>
            <input
                type="file"
                multiple
                onChange={async (e) => {
                    const files = e.target.files
                    if (!files) return

                    const fileArray = Array.from(files)

                    const results = await Promise.all(
                        fileArray.map((file) => uploadProjectFile(file))
                    )

                    console.log("results", results)
                }}
            />
        </div>
    )
}