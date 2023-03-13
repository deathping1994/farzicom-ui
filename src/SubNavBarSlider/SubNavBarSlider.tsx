import React from "react";
// import Image from "next/image";
// import * as S from "./style";
// import Link from "next/link";

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
      <div className={`${sliderClass}__wrapperrrrrr`}>
        test
      </div>
    );
  }
  return <></>;
};
SubNavBarSlider.displayName = "SubNavBarSlider";
export default SubNavBarSlider;
