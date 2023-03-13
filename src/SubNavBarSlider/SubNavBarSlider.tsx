import React from "react";
import Image from "next/image";
import * as S from "./style";
import Link from "next/link";

export interface ISubNavBarSliderProps {
  sliderData: sliderDataInterface[];
  sliderClass?: string;
}

interface sliderDataInterface {
  image?: string;
  title?: string;
  navigation?: string;
  imageDimensions?: {
    height: string;
    width: string;
  };
  alt?: string;
}

export const SubNavBarSlider: React.FC<ISubNavBarSliderProps> = ({
  sliderData,
  sliderClass = "subNavUI",
}) => {
  if (Array.isArray(sliderData) && sliderData.length > 0) {
    return (
      <S.NavbarContainerWrapper className={`${sliderClass}__wrapper`}>
        <S.SubNavOrderList
          className={`${sliderClass}__lists`}
          repeat={sliderData.length}
        >
          {sliderData?.map((navItems: sliderDataInterface) => (
            <S.SubNavlist>
              <Link href={navItems?.navigation || "/"}>
                <Image
                  src={navItems?.image || ""}
                  alt={navItems?.alt}
                  height={navItems?.imageDimensions?.height}
                  width={navItems?.imageDimensions?.width}
                  className={`${sliderClass}__image`}
                />
              </Link>
              <p className={`${sliderClass}__title`}>{navItems?.title}</p>
            </S.SubNavlist>
          ))}
        </S.SubNavOrderList>
      </S.NavbarContainerWrapper>
    );
  }
  return <></>
};
SubNavBarSlider.displayName = "SubNavBarSlider";
export default SubNavBarSlider;
