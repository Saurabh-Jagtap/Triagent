interface AuthHeaderProps {
    title: string;
    description: string;
}

export default function AuthHeader({
    title,
    description,
}: AuthHeaderProps) {
    return (
        <header className="text-center">
            <h1
                className="
                    font-newsreader
                    text-4xl
                    font-medium
                    tracking-[-0.02em]
                    text-[#13294B]
                "
            >
                {title}
            </h1>

            <p
                className="
                    mx-auto
                    mt-3
                    max-w-xs
                    text-sm
                    leading-7
                    text-[#5B6472]
                "
            >
                {description}
            </p>
        </header>
    );
}