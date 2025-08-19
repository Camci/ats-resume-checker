import "pdfjs-dist/build/pdf.worker.mjs";


const getResumeImage = async (resume: File) => {
    // Check if we're on the client side and have access to DOM APIs
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        throw new Error('This function can only run on the client side');
    }

    try {
        // Dynamic import to avoid SSR issues
        const pdfjs = await import('pdfjs-dist');
        
        const buffer = await resume.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: buffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const context = canvas.getContext("2d");

        if (context) {
            await page.render({ canvas, canvasContext: context, viewport: viewport }).promise;
            const imageBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
            
            if (imageBlob) {
                return imageBlob;
            }
        }
        
        throw new Error('Failed to create image from PDF');
    } catch (error) {
        console.error('Error processing PDF:', error);
        throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export default getResumeImage;