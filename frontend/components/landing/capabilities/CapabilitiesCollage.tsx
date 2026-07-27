import { DesktopCollage } from "./DesktopCollage";
import { MobileCollage } from "./MobileCollage";

export function CapabilitiesCollage() {
  return (
    <>
      <div className="block lg:hidden">
        <MobileCollage />
      </div>

      <div className="hidden lg:block">
        <DesktopCollage />
      </div>
    </>
  );
}