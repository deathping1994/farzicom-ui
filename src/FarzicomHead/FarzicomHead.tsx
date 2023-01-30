import React from "react";
import Head from "next/head";
import { IFarzicomHeadProps } from "./FarzicomHead.types";
import { getMetadataValue, parseJson } from "../utils";

const getId = (data: any): string | null => {
  if (data?.enable && data?.id) {
    return data?.id;
  }
  return null;
};

const FarzicomHead: React.FC<IFarzicomHeadProps> = ({
  useFb,
  useGTM,
  useFavicon,
  shopMeta,

}) => {
  console.log("FarzicomHead")
  const facebookIdContent =
    shopMeta &&
    getMetadataValue(shopMeta, "facebookPixel_id") &&
    parseJson(getMetadataValue(shopMeta, "facebookPixel_id"));

  const gtmIdContent =
    shopMeta &&
    getMetadataValue(shopMeta, "GTM_id") &&
    parseJson(getMetadataValue(shopMeta, "GTM_id"));


    const FAVICON_IMAGE =
    shopMeta &&
    getMetadataValue(shopMeta, "favicon_image") &&
    parseJson(getMetadataValue(shopMeta, "favicon_image"));


    console.log("FAVICON_IMAGE", FAVICON_IMAGE);


  const gtmScriptContent = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${getId(gtmIdContent)}');
  `;

  const fbScriptContent = `
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq(
    "init",
    "${getId(facebookIdContent)}"
  );
  fbq("track", "PageView");
`;


  return (
    <>
    {console.log("farzicomHead outside head")}
      <Head>
      {console.log("farzicomHead inside head")}
        {useGTM && getId(gtmIdContent) ? (
          <>
            <script
              async
              defer
              crossOrigin="anonymous"
              data-from="FazicomUI-Head"
              dangerouslySetInnerHTML={{
                __html: gtmScriptContent,
              }}
            />
          </>
        ) : (
          <></>
        )}
        {useFb && getId(facebookIdContent) ? (
          <>
            <script
              async
              crossOrigin="anonymous"
              data-from="FazicomUI-Head"
              dangerouslySetInnerHTML={{
                __html: fbScriptContent,
              }}
            />
          </>
        ) : (
          <></>
        )}
        {useFavicon ? <link rel="shortcut icon" href={FAVICON_IMAGE} /> : <></>}
      </Head>
    </>
  );
};

FarzicomHead.displayName = "FarzicomHead";
export default FarzicomHead;
