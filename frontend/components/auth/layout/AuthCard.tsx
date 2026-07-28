interface AuthCardProps {
    children: React.ReactNode;
}

export default function AuthCard({
    children,
}: AuthCardProps) {
    return (
        <div
            className="
                mt-10
                w-full

                rounded-3xl

                border
                border-[#13294B]/5

                bg-gradient-to-b
                from-white
                to-[#FBFAF7]

                p-8

                shadow-[0_1px_1px_rgba(19,41,75,0.04),0_46px_80px_-38px_rgba(19,41,75,0.28)]

                md:p-11
            "
        >
            {children}
        </div>
    );
}