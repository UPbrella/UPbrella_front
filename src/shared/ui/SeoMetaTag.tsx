import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type TProps = {
  title: string;
  description: string;
  keywords: string;
  imgSrc: string;
  url: string;
};

const STATIC_DEFAULTS = {
  imgSrc: "https://upbrella.co.kr/assets/section3-af1c1a5c.png",
  url: "https://upbrella.co.kr/",
} satisfies Pick<TProps, "imgSrc" | "url">;

const DEV_URL = "http://upbrella-dev.site";

const SeoMetaTag = ({
  title,
  keywords,
  description,
  imgSrc = STATIC_DEFAULTS.imgSrc,
  url = STATIC_DEFAULTS.url,
}: Partial<TProps>) => {
  const { t } = useTranslation();
  const resolvedDescription = description ?? t("seo.default.desc");
  const titleSuffix = title ?? t("seo.default.suffix");
  const viewTitle = `${t("seo.default.prefix")} ${titleSuffix}`;
  const baseKeywords = t("seo.default.keywords");
  const viewKeywords = keywords ? baseKeywords + keywords : baseKeywords;
  const robotsContent = window.location.origin === DEV_URL ? "noindex" : "all";

  return (
    <Helmet>
      <title>{viewTitle}</title>

      {/* basic */}
      <meta name="title" content={viewTitle} />
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={viewKeywords} />
      <meta name="robots" content={robotsContent} />

      {/*  sns */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={viewTitle} />
      <meta property="og:site_name" content={viewTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={imgSrc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={viewTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imgSrc} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SeoMetaTag;
