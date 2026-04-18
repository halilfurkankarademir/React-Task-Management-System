import { useEffect, useState } from "react";

const useDeviceDetect = () => {
    const [deviceType, setDeviceType] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setDeviceType({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        // İlk yükleme sırasında çalıştır
        handleResize();

        // Ekran boyutu değiştiğinde çalıştır
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return deviceType;
};

export default useDeviceDetect;
