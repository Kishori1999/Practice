import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../styles/token";
import { AssetCategory } from "../../constants";
import {
  rarityLabel,
  getRarityIconId,
  getElementIconId,
  getFactionIconId,
  getPetClassIconId,
  Chroma,
} from "../constants";
import { Link } from "../../components";
import AssetIcon from "./AssetIcon";

const Media = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40%;
`;

const Container = styled.div`
  position: relative;
  padding: 1.5em;
  width: 15em;
  height: 28.7em;

  @media ${token.collections.filterBreak} {
    width: 19em;
    height: 33.3em;
  }

  @media ${token.collections.cardBreak} {
    width: 19em;
    height: 33.3em;

    &::before {
      position: absolute;
      content: "";
      box-shadow: 0 0 60px 6px ${token.palette.blue.dark};
      opacity: 0;
      transition: opacity 0.4s ease-out;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &:hover::before {
      opacity: 1;
    }
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 40%, rgba(0, 0, 0, 0) 70%);
  pointer-events: none;
`;

const Attributes = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  color: ${token.palette.light.main};
  text-align: center;
  flex-flow: column nowrap;
  justify-items: flex-end;
`;

const Name = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: column-reverse;

  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  //font-size: 2.35rem;
  font-size: 2.35em;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0.1em;
  line-height: 1em;
  letter-spacing: -0.0625em;

  @media ${token.collections.filterBreak} {
    //font-size: max(${token.fontSizes.big}, 26px);
    font-size: 1.625em;
    margin-top: 1.4em;
    margin-bottom: 0;
  }
`;

const Tagline = styled.div`
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  //font-size: ${token.fontSizes.base};
  //font-size: 1.2rem;
  font-size: 1.2em;
  text-transform: uppercase;
  line-height: 1.2;

  @media ${devices.md} {
    font-size: max(${token.fontSizes.base}, 16px);
    line-height: 1;
  }
`;

const Edition = styled.div`
  //font-size: 1.15rem;
  font-size: 1.15em;
  margin-top: 0.8em;
  margin-bottom: 0.5em;

  @media ${devices.md} {
    font-size: max(${token.fontSizes.xs}, 13px);
    margin-top: 0.7em;
    margin-bottom: 0;
  }
`;

const Types = styled.div`
  display: flex;
  align-items: center;
`;

const Type = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;
  flex-grow: 1;
  margin-top: 0.5em;
  margin-bottom: 1em;
  text-transform: uppercase;
  font-family: ${token.fontFamily.secondary};
  font-size: ${token.fontSizes.base};
  font-weight: bold;

  &:not(:first-child) {
    border-left: 1px solid rgba(64, 199, 226, 0.5);
  }

  @media ${devices.md} {
    font-size: max(0.875em, 10px);
  }
`;

const TypeText = styled.span`
  margin-top: 0.3em;

  @media ${devices.xs} {
    font-size: ${token.fontSizes.xs};
  }
`;

const AttributeIcon = styled.div`
  width: 2em;
  height: 2em;
  @media ${devices.md} {
    width: 2.8em;
    height: 2.8em;
  }
`;

const FrameContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const EliteFrame = () => (
  <svg
    height="100%"
    width="100%"
    preserveAspectRatio="none"
    viewBox="0 0 618 1074"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <linearGradient id="el" gradientUnits="userSpaceOnUse" x1="15.89" x2="37.7" y1="36.97" y2="36.97">
      <stop offset="0" stopColor="#ffc500" />
      <stop offset="1" stopColor="#ff9100" />
    </linearGradient>
    <linearGradient id="elb" x1="580.34" x2="602.15" xlinkHref="#el" y1="36.97" y2="36.97" />
    <linearGradient id="elc" x1="15.36" x2="602.67" xlinkHref="#el" y1="537.02" y2="537.02" />
    <linearGradient id="eld" x1="580.34" x2="602.15" xlinkHref="#el" y1="1037" y2="1037" />
    <linearGradient id="ele" x1="15.89" x2="37.7" xlinkHref="#el" y1="1037" y2="1037" />
    <path
      d="m0 0v1074h618v-1074zm141.86 1030.17h-82.8l-5.21-5.17h-10.73v-13l-5-5v-74.55l-6.82-6.45v-778l6.82-6.48v-74.52l5-5v-13h10.73l5.21-5.21h82.8l4.26-4.37h325.79l4.27 4.27h82.82l5.21 5.21h10.73v13.1l5 5v74.51l6.83 6.48v459.37 318.64l-6.83 6.5v74.5l-5 5v13h-10.76l-5.21 5.21h-82.79l-4.27 4.26h-325.79z"
      fill="#000918"
    />
    <path d="m16.94 26.03h20.76v-1.05h-21.81v23.97h1.05z" fill="url(#ela)" />
    <path d="m601.1 48.95h1.05v-23.97h-21.81v1.05h20.76z" fill="url(#elb)" />
    <path
      d="m602.67 86v-20.67l-7.53-4.33v-29.84h-28.92l-3.8-6.71h-22.61v2.11h21.38l2.61 4.6h-10.12l-3 2.78-3.49-3h-81.6l-6.23-6.23h-300.69l-6.2 6.21h-81.61l-3.5 3-3-2.78h-10.12l2.6-4.6h21.39v-2.09h-22.62l-3.79 6.71h-28.93v29.84l-7.53 4.36v20.64h2.11v-19.46l5.42-3.09v17.33 72.95l-7.1 6.82v752.9l7.1 6.74v73 17.38l-5.42-3.12v-19.45h-2.11v20.68l7.53 4.35v29.81h28.93l3.79 6.71h22.62v-2.06h-21.39l-2.6-4.61h10.12l3-2.78 3.48 3h81.61l6.2 6.2h300.71l6.2-6.2h81.6l3.49-3 3 2.78h10.12l-2.61 4.61h-21.35v2.1h22.61l3.8-6.71h28.92v-29.88l7.53-4.35v-20.65h-2.1v19.49l-5.43 3.14v-17.45-73l7.11-6.74v-752.89l-7.11-6.75v-73-17.35l5.43 3.13v19.42zm-9.67-52.73v26.48l-4-2.31v-19.6h-19l-2.59-4.57zm0 48.48-6.28 4v60.12l-5.25-5v-74.49l-5-5v-14h-11.63l-5.21-5.21h-82.8l-2.68-2.72h73.59l3.35-3 3.48 3h13.9l3.14 5.55h9.6v10.35l6.25 3.65v16.33l5.54 5.58zm0 536v302.25l-5.23 5v-458.39-317.61l5.23 5zm-6.28-10.42v318.67l-6.83 6.5v74.5l-5 5v13h-10.71l-5.21 5.21h-82.79l-4.27 4.26h-325.79l-4.26-4.26h-82.8l-5.21-5.21h-10.73v-13l-5-5v-74.55l-6.82-6.45v-459.39-318.61l6.82-6.48v-74.52l5-5v-13h10.73l5.21-5.21h82.8l4.26-4.37h325.79l4.27 4.27h82.82l5.21 5.21h10.73v13.1l5 5v74.51l6.83 6.48v459.37zm6.28 385.67-5.58 5.58v16.42l-6.25 3.62v10.38h-9.6l-3.14 5.56h-13.9l-3.48 3-3.34-3.09h-73.6l2.68-2.68h82.8l5.21-5.22h11.65v-14l5-5v-74.47l5.25-5v60.15l6.28 4zm-5.58 24.43v17.1h-16.53l2-3.46h10.47v-11.26zm-117.65 19.14-4.9 4.89h-311.75l-4.89-4.89zm-439.19-19.12 4.14 2.39v11.25h10.47l2 3.46h-16.61zm15.84 11.55h-9.6v-10.37l-6.24-3.63v-16.37l-5.58-5.58v-.83l6.28-4v-60.1l5.24 5v74.48l5 5v14h11.68l5.21 5.22h82.79l2.69 2.68h-73.6l-3.35 3.09-3.47-3h-13.9zm-21.42-572.81v-302.19l5.23-5v458.36 317.64l-5.23-5zm0-375.28 5.58-5.58v-16.33l6.24-3.61v-10.39h9.6l3.15-5.54h13.9l3.47-3 3.35 3h73.6l-2.69 2.69h-82.79l-5.21 5.2h-11.66v14l-5 5v74.48l-5.24 5v-60.11l-6.28-4zm5.58-24.38v-17.08h16.57l-2 3.46h-10.43v11.22zm117.65-19.14 4.89-4.89h311.79l4.9 4.89zm435.13 16.74v-11.25h-10.52l-2-3.46h16.62v17.11zm-28.86-20.86h10.5l2.59 4.57h-12.43l-2.9-2.51zm-7.92-.77 2.91 2.5-2.57 2.37h-74.92l-4.89-4.89zm-387.22-6.21h299.35l4.65 4.63h-308.66zm-87.91 6.21h79.44l-4.89 4.89h-74.89l-2.57-2.39zm-7.91.77 2.23 2.06-2.89 2.51h-12.42l2.59-4.57zm-38.54 0h25.63l-2.63 4.57h-19v19.61l-4 2.31zm0 28.92 4-2.32v14.81l-4 4zm0 20.81 5.23 3.3v60.54l-5.23 5zm-7.64 829.74v-751.51l5.52-5.23v762zm12.86 14.38v60.55l-5.22 3.33v-68.84zm-5.22 68.17 4 4v14.8l-4-2.31zm0 45.41v-26.49l4 2.31v19.6h19l2.59 4.58zm38.54 0h-10.49l-2.59-4.58h12.42l2.9 2.51zm7.91.77-2.91-2.53 2.57-2.36h74.89l4.9 4.89zm387.26 6.2h-299.35l-4.62-4.62h308.62zm87.87-6.2h-79.43l4.89-4.89h74.88l2.57 2.36zm7.92-.77-2.24-2.07 2.9-2.51h12.42l-2.58 4.58zm38.54 0h-25.63l2.59-4.58h19v-19.6l4-2.31zm0-28.92-4 2.31v-14.8l4-4zm-.04-20.78-5.23-3.3v-60.58l5.23-5zm7.63-829.74v751.48l-5.49 5.26v-762zm-12.86-14.39v-60.57l5.23-3.3v68.8zm5.23-68.19-4-4v-14.81l4 2.32z"
      fill="url(#elc)"
    />
    <path d="m601.1 1047.94h-20.76v1.05h21.81v-23.98h-1.05z" fill="url(#eld)" />
    <path d="m16.94 1025.01h-1.05v23.98h21.81v-1.05h-20.76z" fill="url(#ele)" />
  </svg>
);

const MythicFrame = () => (
  <svg
    height="100%"
    width="100%"
    preserveAspectRatio="none"
    viewBox="0 0 618 1074"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <linearGradient id="m" gradientUnits="userSpaceOnUse" x1="141.65" x2="720.65" y1="200.67" y2="1025.92">
      <stop offset=".01" stopColor="#00c9c5" />
      <stop offset=".35" stopColor="#0070dd" />
      <stop offset=".46" stopColor="#4557e4" />
      <stop offset=".55" stopColor="#7845ea" />
      <stop offset=".62" stopColor="#9739ed" />
      <stop offset=".66" stopColor="#a335ee" />
      <stop offset=".69" stopColor="#b441cd" />
      <stop offset=".74" stopColor="#cb51a2" />
      <stop offset=".79" stopColor="#de5e7e" />
      <stop offset=".84" stopColor="#ec6862" />
      <stop offset=".9" stopColor="#f76f4f" />
      <stop offset=".95" stopColor="#fd7443" />
      <stop offset="1" stopColor="#ff753f" />
    </linearGradient>
    <linearGradient id="mb" x1="525.3" x2="1104.29" xlinkHref="#m" y1="-68.49" y2="756.76" />
    <linearGradient id="mc" x1="95.68" x2="674.67" xlinkHref="#m" y1="232.93" y2="1058.18" />
    <linearGradient id="md" x1="49.73" x2="628.72" xlinkHref="#m" y1="265.17" y2="1090.42" />
    <linearGradient id="me" x1="-333.92" x2="245.07" xlinkHref="#m" y1="534.33" y2="1359.58" />
    <path
      d="m0 0v1074h618v-1074zm141.86 1030.17h-82.8l-5.21-5.17h-10.73v-13l-5-5v-74.55l-6.82-6.45v-778l6.82-6.48v-74.52l5-5v-13h10.73l5.21-5.21h82.8l4.26-4.37h325.79l4.27 4.27h82.82l5.21 5.21h10.73v13.1l5 5v74.51l6.83 6.48v459.37 318.64l-6.83 6.5v74.5l-5 5v13h-10.76l-5.21 5.21h-82.79l-4.27 4.26h-325.79z"
      fill="#000918"
    />
    <path d="m16.94 26.03h20.76v-1.05h-21.81v23.97h1.05z" fill="url(#m)" />
    <path d="m601.1 48.95h1.05v-23.97h-21.81v1.05h20.76z" fill="url(#ma)" />
    <path
      d="m602.67 86v-20.67l-7.53-4.33v-29.84h-28.92l-3.8-6.71h-22.61v2.11h21.38l2.61 4.6h-10.12l-3 2.78-3.49-3h-81.6l-6.23-6.23h-300.69l-6.2 6.21h-81.61l-3.5 3-3-2.78h-10.12l2.6-4.6h21.39v-2.09h-22.62l-3.79 6.71h-28.93v29.84l-7.53 4.36v20.64h2.11v-19.46l5.42-3.09v17.33 72.95l-7.1 6.82v752.9l7.1 6.74v73 17.38l-5.42-3.12v-19.45h-2.11v20.68l7.53 4.35v29.81h28.93l3.79 6.71h22.62v-2.06h-21.39l-2.6-4.61h10.12l3-2.78 3.48 3h81.61l6.2 6.2h300.71l6.2-6.2h81.6l3.49-3 3 2.78h10.12l-2.61 4.61h-21.35v2.1h22.61l3.8-6.71h28.92v-29.88l7.53-4.35v-20.65h-2.1v19.49l-5.43 3.14v-17.45-73l7.11-6.74v-752.89l-7.11-6.75v-73-17.35l5.43 3.13v19.42zm-9.67-52.73v26.48l-4-2.31v-19.6h-19l-2.59-4.57zm0 48.48-6.28 4v60.12l-5.25-5v-74.49l-5-5v-14h-11.63l-5.21-5.21h-82.8l-2.68-2.72h73.59l3.35-3 3.48 3h13.9l3.14 5.55h9.6v10.35l6.25 3.65v16.33l5.54 5.58zm0 536v302.25l-5.23 5v-458.39-317.61l5.23 5zm-6.28-10.42v318.67l-6.83 6.5v74.5l-5 5v13h-10.71l-5.21 5.21h-82.79l-4.27 4.26h-325.79l-4.26-4.26h-82.8l-5.21-5.21h-10.73v-13l-5-5v-74.55l-6.82-6.45v-459.39-318.61l6.82-6.48v-74.52l5-5v-13h10.73l5.21-5.21h82.8l4.26-4.37h325.79l4.27 4.27h82.82l5.21 5.21h10.73v13.1l5 5v74.51l6.83 6.48v459.37zm6.28 385.67-5.58 5.58v16.42l-6.25 3.62v10.38h-9.6l-3.14 5.56h-13.9l-3.48 3-3.34-3.09h-73.6l2.68-2.68h82.8l5.21-5.22h11.65v-14l5-5v-74.47l5.25-5v60.15l6.28 4zm-5.58 24.43v17.1h-16.53l2-3.46h10.47v-11.26zm-117.65 19.14-4.9 4.89h-311.75l-4.89-4.89zm-439.19-19.12 4.14 2.39v11.25h10.47l2 3.46h-16.61zm15.84 11.55h-9.6v-10.37l-6.24-3.63v-16.37l-5.58-5.58v-.83l6.28-4v-60.1l5.24 5v74.48l5 5v14h11.68l5.21 5.22h82.79l2.69 2.68h-73.6l-3.35 3.09-3.47-3h-13.9zm-21.42-572.81v-302.19l5.23-5v458.36 317.64l-5.23-5zm0-375.28 5.58-5.58v-16.33l6.24-3.61v-10.39h9.6l3.15-5.54h13.9l3.47-3 3.35 3h73.6l-2.69 2.69h-82.79l-5.21 5.2h-11.66v14l-5 5v74.48l-5.24 5v-60.11l-6.28-4zm5.58-24.38v-17.08h16.57l-2 3.46h-10.43v11.22zm117.65-19.14 4.89-4.89h311.79l4.9 4.89zm435.13 16.74v-11.25h-10.52l-2-3.46h16.62v17.11zm-28.86-20.86h10.5l2.59 4.57h-12.43l-2.9-2.51zm-7.92-.77 2.91 2.5-2.57 2.37h-74.92l-4.89-4.89zm-387.22-6.21h299.35l4.65 4.63h-308.66zm-87.91 6.21h79.44l-4.89 4.89h-74.89l-2.57-2.39zm-7.91.77 2.23 2.06-2.89 2.51h-12.42l2.59-4.57zm-38.54 0h25.63l-2.63 4.57h-19v19.61l-4 2.31zm0 28.92 4-2.32v14.81l-4 4zm0 20.81 5.23 3.3v60.54l-5.23 5zm-7.64 829.74v-751.51l5.52-5.23v762zm12.86 14.38v60.55l-5.22 3.33v-68.84zm-5.22 68.17 4 4v14.8l-4-2.31zm0 45.41v-26.49l4 2.31v19.6h19l2.59 4.58zm38.54 0h-10.49l-2.59-4.58h12.42l2.9 2.51zm7.91.77-2.91-2.53 2.57-2.36h74.89l4.9 4.89zm387.26 6.2h-299.35l-4.62-4.62h308.62zm87.87-6.2h-79.43l4.89-4.89h74.88l2.57 2.36zm7.92-.77-2.24-2.07 2.9-2.51h12.42l-2.58 4.58zm38.54 0h-25.63l2.59-4.58h19v-19.6l4-2.31zm0-28.92-4 2.31v-14.8l4-4zm-.04-20.78-5.23-3.3v-60.58l5.23-5zm7.63-829.74v751.48l-5.49 5.26v-762zm-12.86-14.39v-60.57l5.23-3.3v68.8zm5.23-68.19-4-4v-14.81l4 2.32z"
      fill="url(#mc)"
    />
    <path d="m601.1 1047.94h-20.76v1.05h21.81v-23.98h-1.05z" fill="url(#md)" />
    <path d="m16.94 1025.01h-1.05v23.98h21.81v-1.05h-20.76z" fill="url(#me)" />
  </svg>
);

const WarriorFrame = () => (
  <svg
    height="100%"
    width="100%"
    preserveAspectRatio="none"
    viewBox="0 0 618 1074"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <linearGradient id="w" gradientUnits="userSpaceOnUse" x1="15.89" x2="37.7" y1="36.97" y2="36.97">
      <stop offset=".01" stopColor="#a335ee" />
      <stop offset="1" stopColor="#7b15cc" />
    </linearGradient>
    <linearGradient id="wb" x1="580.34" x2="602.15" xlinkHref="#w" y1="36.97" y2="36.97" />
    <linearGradient id="wc" x1="15.36" x2="602.67" xlinkHref="#w" y1="537.02" y2="537.02" />
    <linearGradient id="wd" x1="580.34" x2="602.15" xlinkHref="#w" y1="1037" y2="1037" />
    <linearGradient id="we" x1="15.89" x2="37.7" xlinkHref="#w" y1="1037" y2="1037" />
    <path
      d="m0 0v1074h618v-1074zm141.86 1030.17h-82.8l-5.21-5.17h-10.73v-13l-5-5v-74.55l-6.82-6.45v-778l6.82-6.48v-74.52l5-5v-13h10.73l5.21-5.21h82.8l4.26-4.37h325.79l4.27 4.27h82.82l5.21 5.21h10.73v13.1l5 5v74.51l6.83 6.48v459.37 318.64l-6.83 6.5v74.5l-5 5v13h-10.76l-5.21 5.21h-82.79l-4.27 4.26h-325.79z"
      fill="#000918"
    />
    <path d="m16.94 26.03h20.76v-1.05h-21.81v23.97h1.05z" fill="url(#w)" />
    <path d="m601.1 48.95h1.05v-23.97h-21.81v1.05h20.76z" fill="url(#wb)" />
    <path
      d="m602.67 86v-20.67l-7.53-4.33v-29.84h-28.92l-3.8-6.71h-22.61v2.11h21.38l2.61 4.6h-10.12l-3 2.78-3.49-3h-81.6l-6.23-6.23h-300.69l-6.2 6.21h-81.61l-3.5 3-3-2.78h-10.12l2.6-4.6h21.39v-2.09h-22.62l-3.79 6.71h-28.93v29.84l-7.53 4.36v20.64h2.11v-19.46l5.42-3.09v17.33 72.95l-7.1 6.82v752.9l7.1 6.74v73 17.38l-5.42-3.12v-19.45h-2.11v20.68l7.53 4.35v29.81h28.93l3.79 6.71h22.62v-2.06h-21.39l-2.6-4.61h10.12l3-2.78 3.48 3h81.61l6.2 6.2h300.71l6.2-6.2h81.6l3.49-3 3 2.78h10.12l-2.61 4.61h-21.35v2.1h22.61l3.8-6.71h28.92v-29.88l7.53-4.35v-20.65h-2.1v19.49l-5.43 3.14v-17.45-73l7.11-6.74v-752.89l-7.11-6.75v-73-17.35l5.43 3.13v19.42zm-9.67-52.73v26.48l-4-2.31v-19.6h-19l-2.59-4.57zm0 48.48-6.28 4v60.12l-5.25-5v-74.49l-5-5v-14h-11.63l-5.21-5.21h-82.8l-2.68-2.72h73.59l3.35-3 3.48 3h13.9l3.14 5.55h9.6v10.35l6.25 3.65v16.33l5.54 5.58zm0 536v302.25l-5.23 5v-458.39-317.61l5.23 5zm-6.28-10.42v318.67l-6.83 6.5v74.5l-5 5v13h-10.71l-5.21 5.21h-82.79l-4.27 4.26h-325.79l-4.26-4.26h-82.8l-5.21-5.21h-10.73v-13l-5-5v-74.55l-6.82-6.45v-459.39-318.61l6.82-6.48v-74.52l5-5v-13h10.73l5.21-5.21h82.8l4.26-4.37h325.79l4.27 4.27h82.82l5.21 5.21h10.73v13.1l5 5v74.51l6.83 6.48v459.37zm6.28 385.67-5.58 5.58v16.42l-6.25 3.62v10.38h-9.6l-3.14 5.56h-13.9l-3.48 3-3.34-3.09h-73.6l2.68-2.68h82.8l5.21-5.22h11.65v-14l5-5v-74.47l5.25-5v60.15l6.28 4zm-5.58 24.43v17.1h-16.53l2-3.46h10.47v-11.26zm-117.65 19.14-4.9 4.89h-311.75l-4.89-4.89zm-439.19-19.12 4.14 2.39v11.25h10.47l2 3.46h-16.61zm15.84 11.55h-9.6v-10.37l-6.24-3.63v-16.37l-5.58-5.58v-.83l6.28-4v-60.1l5.24 5v74.48l5 5v14h11.68l5.21 5.22h82.79l2.69 2.68h-73.6l-3.35 3.09-3.47-3h-13.9zm-21.42-572.81v-302.19l5.23-5v458.36 317.64l-5.23-5zm0-375.28 5.58-5.58v-16.33l6.24-3.61v-10.39h9.6l3.15-5.54h13.9l3.47-3 3.35 3h73.6l-2.69 2.69h-82.79l-5.21 5.2h-11.66v14l-5 5v74.48l-5.24 5v-60.11l-6.28-4zm5.58-24.38v-17.08h16.57l-2 3.46h-10.43v11.22zm117.65-19.14 4.89-4.89h311.79l4.9 4.89zm435.13 16.74v-11.25h-10.52l-2-3.46h16.62v17.11zm-28.86-20.86h10.5l2.59 4.57h-12.43l-2.9-2.51zm-7.92-.77 2.91 2.5-2.57 2.37h-74.92l-4.89-4.89zm-387.22-6.21h299.35l4.65 4.63h-308.66zm-87.91 6.21h79.44l-4.89 4.89h-74.89l-2.57-2.39zm-7.91.77 2.23 2.06-2.89 2.51h-12.42l2.59-4.57zm-38.54 0h25.63l-2.63 4.57h-19v19.61l-4 2.31zm0 28.92 4-2.32v14.81l-4 4zm0 20.81 5.23 3.3v60.54l-5.23 5zm-7.64 829.74v-751.51l5.52-5.23v762zm12.86 14.38v60.55l-5.22 3.33v-68.84zm-5.22 68.17 4 4v14.8l-4-2.31zm0 45.41v-26.49l4 2.31v19.6h19l2.59 4.58zm38.54 0h-10.49l-2.59-4.58h12.42l2.9 2.51zm7.91.77-2.91-2.53 2.57-2.36h74.89l4.9 4.89zm387.26 6.2h-299.35l-4.62-4.62h308.62zm87.87-6.2h-79.43l4.89-4.89h74.88l2.57 2.36zm7.92-.77-2.24-2.07 2.9-2.51h12.42l-2.58 4.58zm38.54 0h-25.63l2.59-4.58h19v-19.6l4-2.31zm0-28.92-4 2.31v-14.8l4-4zm-.04-20.78-5.23-3.3v-60.58l5.23-5zm7.63-829.74v751.48l-5.49 5.26v-762zm-12.86-14.39v-60.57l5.23-3.3v68.8zm5.23-68.19-4-4v-14.81l4 2.32z"
      fill="url(#wc)"
    />
    <path d="m601.1 1047.94h-20.76v1.05h21.81v-23.98h-1.05z" fill="url(#wd)" />
    <path d="m16.94 1025.01h-1.05v23.98h21.81v-1.05h-20.76z" fill="url(#we)" />
  </svg>
);

const AssetCard = ({ category, chroma, name, tagline, element, petClass, faction, rarity, imgSrc, url }) => {
  let attributes;
  switch (category) {
    case AssetCategory.Hero:
      attributes = (
        <>
          <Name>{name}</Name>
          <Tagline>{tagline}</Tagline>
          <Edition>{/* TODO uncomment once implemented #{edition.assetNumber} / {edition.total} */} </Edition>
          <Types>
            <Type>
              <AttributeIcon>
                <AssetIcon id={getElementIconId(element)} />
              </AttributeIcon>
              <TypeText>{element}</TypeText>
            </Type>
            <Type>
              <AttributeIcon>
                <AssetIcon id={getRarityIconId(rarity)} />
              </AttributeIcon>
              <TypeText>{rarityLabel[rarity]}</TypeText>
            </Type>
            <Type>
              <AttributeIcon>
                <AssetIcon id={getFactionIconId(faction)} />
              </AttributeIcon>
              <TypeText>{faction}</TypeText>
            </Type>
          </Types>
        </>
      );
      break;
    case AssetCategory.Pet:
      attributes = (
        <>
          <Name>{name}</Name>
          <Edition>{/* TODO uncomment once implemented #{edition.assetNumber} / {edition.total} */}</Edition>
          <Types>
            <Type>
              <AttributeIcon>
                <AssetIcon id={getRarityIconId(rarity)} />
              </AttributeIcon>
              <TypeText>{rarityLabel[rarity]}</TypeText>
            </Type>
            <Type>
              <AttributeIcon>
                <AssetIcon id={getPetClassIconId(petClass)} />
              </AttributeIcon>
              <TypeText>{petClass}</TypeText>
            </Type>
          </Types>
        </>
      );
      break;
    default:
      attributes = (
        <>
          <Name>{name}</Name>
        </>
      );
      break;
  }

  let SpecialEditionFrame = null;
  if (chroma === Chroma.Warrior) {
    SpecialEditionFrame = WarriorFrame;
  } else if (chroma === Chroma.Elite) {
    SpecialEditionFrame = EliteFrame;
  } else if (chroma === Chroma.Mythic) {
    SpecialEditionFrame = MythicFrame;
  }

  const isSpecialEdition = chroma !== Chroma.Normal;
  return (
    <Link href={`/asset/${url}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <Container>
          <Media>
            <Image layout="fill" objectFit="cover" objectPosition="center 30%" src={imgSrc} alt="" />
          </Media>
          <Shader />
          {isSpecialEdition && (
            <FrameContainer>
              <SpecialEditionFrame />
            </FrameContainer>
          )}
          <Attributes>{attributes}</Attributes>
        </Container>
      </a>
    </Link>
  );
};

export default AssetCard;
