"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
export default function QrScanner({
  onScan,
  onClose,
}: {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText); // Pass scanned data
        scanner.clear(); // Stop scanning
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
    };
  }, [onScan]);

  return (
    <div>
      <div id="qr-reader" />
      <button
        onClick={onClose} // Close the scanner when clicked
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Close Scanner
      </button>
    </div>
  );
}
