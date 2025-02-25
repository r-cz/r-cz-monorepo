import { useTheme } from '@r-cz/theme';

interface SimpleImageProps {
    logoPath: string;
    darkLogoPath?: string;
    alt: string;
    className?: string;
}

const SimpleImage = ({
    logoPath,
    darkLogoPath,
    alt,
    className,
}: SimpleImageProps) => {
    const [themeState] = useTheme();
    const src =
        themeState.isDark && darkLogoPath
            ? darkLogoPath
            : logoPath;

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
        />
    );
};

export default SimpleImage;