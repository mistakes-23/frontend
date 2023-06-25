import { useEffect, useRef } from "react";


export default function PdfViewer(props: any) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        let instance, PSPDFKit: any;
        (async function() {
            PSPDFKit = await import("pspdfkit");
            PSPDFKit.unload(container)
            
            instance = await PSPDFKit.load({
            // Container where PSPDFKit should be mounted.
            container,
            // The document to open.
            document: props.document,
            // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
            baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`
            });
        })();

        return () => PSPDFKit && PSPDFKit.unload(container);
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100vh"}}/>
    );
}