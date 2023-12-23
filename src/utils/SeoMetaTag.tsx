import { Helmet } from "react-helmet-async";

type TProps = {
  title: string;
  description: string;
  keywords: string;
  imgSrc: string;
  url: string;
};

const DEFAULT_META = {
  title: "업브렐라(UPbrella) | ",
  description: "지구를 지키는 작은 우산, 업브렐라를 펼쳐주세요! A Better Choice, UPbrella",
  keywords:
    "업브렐라, UPbrella, upbrella, Upbrella, 공유 우산 플랫폼, 우산 공유 플랫폼, 공유 우산, 우산, 공유 우산 서비스, 신촌, 연세대학교",
  imgSrc: "https://upbrella.co.kr/assets/section3-af1c1a5c.png",
  url: "https://upbrella.co.kr/",
} satisfies TProps;

// Meta tag의 변동이 필요한 곳에서 호출
const SeoMetaTag = ({
  title,
  keywords,
  description = DEFAULT_META.description,
  imgSrc = DEFAULT_META.imgSrc,
  url = DEFAULT_META.url,
}: Partial<TProps>) => {
  const viewTitle = DEFAULT_META.title + (title ?? "공유 우산 플랫폼");
  const viewKeywords = keywords ? DEFAULT_META.keywords + keywords : DEFAULT_META.keywords;

  return (
    <Helmet>
      <title>{viewTitle}</title>

      {/* basic */}
      <meta name="title" content={description} />
      <meta name="description" content={description} />
      <meta name="keywords" content={viewKeywords} />

      {/*  sns */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={viewTitle} />
      <meta property="og:site_name" content={viewTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgSrc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={viewTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgSrc} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SeoMetaTag;
