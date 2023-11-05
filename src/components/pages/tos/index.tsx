import Footer from "@/components/organisms/Footer";

export type DetailedTitleProps = {
  title: string;
};
export type DetailedNumberContentProps = {
  number?: number;
  content: string;
  circleContents?: string[] | null;
  smallContents?: string[];
};
export type ContentProps = {
  title: string;
  contents: string[];
  circleContents?: { [key: number]: string[] } | undefined;
  smallContents?: string[];
};
const TermsOfService = () => {
  const titles: string[] = [
    "제1조 (목적)",
    "제 2조 (약관의 명시, 효력 및 개정)",
    "제 3조 (회원가입절차)",
    "제 4조 (회원가입 유보 및 거부)",
    "제 5조 (회원 개인정보 변경)",
    "제 6조 (서비스 제공)",
    "제 7조 (서비스내용변경 통지 등)",
    "제 8조 (서비스 이용 절차에 따른 서비스 이용자, 서비스 제공자의 의무)",
    "제 9조 (회원자격 정지 및 해지)",
    "제 10조 (업브렐라의 의무)",
    "제 11조 (이용자의 의무)",
    "제 12조 (규정의 준용)",
    "부칙",
  ];
  const detailedNumberContents: {
    [key: number]: string[];
  } = {
    1: [
      "이 약관은 업브렐라가 운영하는 공유 우산 서비스(이하 “서비스”)를 이용함에 있어 업브렐라와 회원의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.",
    ],
    2: [
      "서비스 이용을 위한 회원가입 시, 이용자는 본약관의 내용을 이해하고 동의한 것으로 간주합니다. ",
      "업브렐라는 관련 법령에 위반되지 않는 범위내에서 본 약관을 개정할 수 있으며, 약관 변경 시 시행일로 최소 15일 이상의 홈페이지를 통한 고객 고지기간을 둡니다. 변경된 약관은 고지기간 중 공지한 ‘시행일’로부터 효력을 발생합니다.",
      "이용자가 상기 고지기간 중 변경된 약관에 대한 명시적인 거절의 의사표시를 하지 않았을 때에는 본 약관 변경에 동의한 것으로 간주됩니다. 개정약관에 동의하지 않을 경우, 이용자는 회원가입을 해지(탈퇴)할 수있습니다.",
    ],
    3: [
      "본 약관은 서비스 이용자가 본 약관을 읽은 후 “동의”버튼을 눌렀을 때 동의된 것으로 간주합니다.",
      "회원가입 시 회원은 이름, 전화번호를 필수적으로 기입하여야 합니다. 이름, 전화번호는 반드시 본인의 정보를 기입하여야 하며, 변경사항 발생 시 갱신하여야 합니다. 허위 사항 기재, 미갱신 시 서비스 이용에 제한을 받을 수 있습니다.",
      "보증금을 환급받을 계좌번호는 회원가입 시 필수 기입 사항이 아닌 이용자의 편의를 위한 선택 기입 사항입니다. 보증금을 환급받을 계좌번호 기입 여부는 서비스의 이용 가능 유무에 영향을 미치지 않습니다.",
    ],
    4: [
      "업브렐라는 다음과 같은 경우 회원가입 승인을 보류할 수 있습니다.",
      "업브렐라는 다음 각 호에 해당하는 회원가입 요청에 대하여는 거부할 수 있습니다.",
    ],
    5: [
      "회원은 언제든지 업브렐라 홈페이지의 MYPAGE에서 자신의 개인정보를 조회할 수 있습니다.",
      "회원은 언제든지 해당 MYPAGE에서 본인이 기입한 보증금 환급을 원하는 은행, 계좌번호 정보를 수정 혹은 삭제할 수 있습니다.",
      "다만, 서비스 관리를 위해 필수적으로 필요하다고 판단되는 이름, 전화번호의 정보는 수정이 불가능합니다. 홈페이지에 기입한 이름, 전화번호의 수정을 원할 시 [MYPAGE] – [개인정보 조회] 화면에서 ‘회원 탈퇴’신청 후, 제 3조에 따른 회원가입 절차를 다시 수행하여야 합니다.",
      "회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 수정 절차를 거치거나 이메일 등 기타 방법으로 업브렐라에 그 변경사항을 알려야 합니다.",
    ],
    6: [
      "업브렐라는 회원에게 공유 우산 대여 서비스를 제공합니다.",
      "이용자는 정상적인 회원가입 절차를 완료한 직후부터 서비스를 이용할 수 있습니다.",
      "공유 우산의 대여, 반납 장소를 제공하는 오프라인 협업 지점의 영업 시간, 기타 제반 사정에 따라 협업 지점 별로 서비스 이용가능 시간이 상이할 수 있습니다.",
      "업브렐라는 시스템 운영에 필요한 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우, 업브렐라 서비스 설비의 유지 및 보수로 인해 서비스 제공이 불가능한 경우, 국가비상사태, 서비스 시설의 장애, 과도한 서비스 이용으로 인한 시스템 마비, 태풍, 우천, 폭설등의 기상상태 악화 등 비정상적인 상황 또는 상기 비상 상황에 대비(복구)하기 위하여 서비스 제공이 불가능할 경우, 서비스 제공을 일시적으로 중단할 수 있습니다. 서비스 제공을 중단하는 경우 업브렐라는 회원에게 중단사실을 사전에 공지하여야 합니다. 다만, 업브렐라가 사전에 공지할 수 없는 부득이한 사유가 있는 경우 사후에 공지를 할 수 있습니다.",
      "업브렐라는 서비스 제공에 필요한 경우 홈페이지 점검을 실시할 수 있으며, 점검시간은 업브렐라 홈페이지에 고지한 바에 따릅니다.",
    ],
    7: [
      "업브렐라 서비스 제공자의 사정으로 서비스 내용이 변경되거나 서비스가 종료되는 경우, 서비스 내용의 변경 사항 또는 종료를 통지할 수 있습니다.",
      "전항의 경우 불특정 다수인을 상대로 통지를 함에 있어서 홈페이지의 공지사항을 통하여 회원들에게 통지할 수 있습니다.",
      "회원에게 중대한 영향을 미치는 사항은 상당한 기간 동안 웹사이트를 통해 공지하고 회원이 회원정보에 입력한 전화번호로 개별통지합니다.",
      "서비스가 종료되는 경우, 서비스 종료 시점에서 업브렐라는 업브렐라가 지정한 합당한 절차에 따라 우산을 대여중인 회원으로부터, 우산을 회수하는 과정을 거쳐 보증금을 환급하는 의무를 지닙니다.",
    ],
    8: [
      "이용자는 업브렐라의 공유 우산 서비스를 이용하기 위하여 재화의 반납을 담보하기 위한, 명시된 보증금을 우산을 대여하기 이전 입금하여야 합니다.",
      "이용자는 대여당일 포함 14일 이내에 지정된 협업 지점으로 우산을 반납하여야 합니다.",
      "업브렐라는 이용자가 대여한 우산이 대여당일 포함 14일 이내에 반납됨에 따라 이용자로부터 수령받은 보증금을 반환할 의무가 있습니다.",
      "그러나, 우산을 대여 당일 포함 14일이 초과되어 반납했을 경우 업브렐라는 이용자에게 보증금을 환급할 의무를 지지 않습니다.",
      "이용자에 의해 우산이 파손된 경우, 이용자가 우산을 반납하지 않은 채 허위로 반납폼을 기재하였을 경우 혹은 이에 준하여 이용자가 대여한 우산이 정상적으로 서비스에 환수되지 않았다고 합리적으로 판단될 경우에도 업브렐라는 이용자에게 보증금을 환급할 의무를 지지 않습니다.",
    ],
    9: [
      "회원이 회원자격을 해지하고자 할 때에는 언제든지 MYPAGE에서 회원의 ID를 삭제하고 탈퇴할 수 있습니다.",
      "다만, 회원자격을 해지하고자 하는 회원이 우산을 대여 중일 경우, 대여 중인 우산의 반납과 보증금 환급 절차가 완료된 후에 회원자격을 해지할 수 있습니다.",
      "회원 탈퇴 시 회원이 회원가입, 우산 대여 및 반납 절차에서 기입한 모든 개인 정보는 자동으로 소멸됩니다.",
      "회원자격이 정지, 해지되는 경우 회원의 로그인 및 서비스 이용 권한은 즉시 중단됩니다.",
      "업브렐라의 결정에 의한 회원자격 정지가 아닌 회원의 자발적 의지 및 요청에 따른 회원자격 해지일 경우 이용자는 언제든지 서비스의 회원으로 재가입할 수 있습니다.",
      "업브렐라는 아래의 각 호에 해당하는 경우, 회원의 회원자격을 일방적으로 정지, 해지할 수 있습니다.",
      "업브렐라는 1항의 회원자격 정지, 해지를 수행함에 있어 회원자격의 정지, 해지 예정 사실을 해당 회원에게 사전 통지합니다.",
      "다만, 업브렐라가 회원의 자격 정지 및 해지를 결정하는 시점에 해당 회원이 보증금을 입금 후 우산을 대여 중일 경우, 업브렐라는 전화번호를 통해 회원 자격 정지 및 해지 예정 사실을 회원에게 사전에 예고하고 대여 중인 우산을 적법하게 인도받은 후 보증금 환급 절차를 완료합니다. 회원의 보증금 환급 절차가 완료된 후에 해당 회원의 회원 자격 정지 및 해지 절차가 진행됩니다.",
      "6항에 따라 업브렐라의 결정에 의한 회원의 회원자격 해지 시에도 회원이 회원가입, 우산 대여 및 반납 절차에서 기입한 모든 개인 정보는 자동으로 소멸됩니다. 다만, 업브렐라의 결정에 의한 회원의 회원자격 해지 시 회원의 소셜 로그인을 방지하기 위한 카카오 고유 ID 개인식별정보(회원정보) 는 1년간 보관됩니다.",
    ],
    10: [
      "업브렐라는 회원의 개인정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습니다. 회원의 개인정보보호에 관한 기타의 사항은 정보통신망법 및 회사가 별도로 정한 “개인정보관리지침”에 따릅니다.",
      "회사는 회원이 수신 동의를 하지 않은 영리 목적의 광고성 전자우편, SMS 문자메시지 등을 발송하지 아니합니다.",
      "입력된 회원의 개인정보는 회원탈퇴와 동시에 삭제됩니다.",
    ],
    11: [
      "서비스 이용과 관련하여 이용자가 허위로 입력한 정보 및 그 허위 정보와 관련하여 발생한 책임과 불이익은 전적으로 이용자가 부담하여야 합니다.",
      "이용자는 서비스를 이용하기 전에 반드시 서비스 약관을 확인해야 합니다. 약관을 확인하지 않고 서비스를 이용함으로써 발생하는 손실과 손해에 대한 책임은 이용자 본인에게 있습니다.",
      "이용자는 서비스 이용 시 반드시 본인 명의의 결제수단을 사용하여야 하며, 타인의 결제수단을 임의로 사용해서는 안 됩니다. 타인의 결제수단을 임의로 사용함으로써 발생하는 손실 및 손해에 대한 모든 책임은 이용자에게 있습니다.",
      "업브렐라가 이용자의 본 약관 및 이용정책 위반 행위를 발견하여 이용자에게 해당 위반행위에 대하여 소명을 요청할 경우 이용자는 업브렐라의 요청에 적극 응하여야 합니다.",
      "서비스의 이용은 반드시 이용자 본인의 이용을 전제로 해야 합니다.",
      "이용자는 업브렐라를 이용할 때, 다음 각 호의 행위를 하지 않아야 합니다.",
      "공유 우산 대여 시 발생할 수 있는 해당 우산의 파손, 손실, 도난에 유의하여야 합니다. 우산의 파손, 손실, 도난에 따른 우산 반납 불능은 서비스 이용자에게 책임이 있으며, 보증금 환급이 불가한 사유가 될 수 있습니다.",
      "이용자는 본 약관의 규정, 이용안내 및 서비스 관련 주의사항, 업브렐라 공지사항 등을 준수하여야 합니다.",
    ],
    12: [
      "본 약관에 명시되지 않은 사항에 대해서는 관련법령에 의하고, 법에 명시되지 않은 부분에 대하여는 관습에 의합니다.",
    ],
    13: ["이 약관은 2023년 9월 1일부터 시행합니다."],
  };
  const detailedCircleContents: {
    [key: number]: { [key: number]: string[] };
  } = {
    4: {
      1: [
        "① 기술적인 문제로 업브렐라 이용에 문제가 발생할 경우",
        "② 효율적인 업브렐라 운영을 위해 필요하다고 인정되는 경우",
        "③ 회원 가입 절차에서 필수 기입 정보인 이름, 전화번호를 허위로 기재하였다고 판단 될 경우",
      ],
      2: [
        "① 다른 사람의 명의를 도용하여 가입신청을 하였을 경우",
        "② 가입 시 기재사항을 허위로 작성하였을 경우",
        "③ 본 약관에 의거하여 업브렐라에 의해 회원자격이 강제로 해지된 자",
      ],
    },
    9: {
      6: [
        "① 본 약관 제 4조 2항의 각 호에 따라 명시된 회원가입 거부사유에 해당하는 사실이 추후 확인된 경우",
        "② 서비스 이용자가 본 약관 제 8조 1항, 8조 2항의 서비스 이용자의 의무를 고의적 혹은 반복적으로 불이행할 경우",
        "③ 기타 합리적인 사유로 인해 이용자에게 서비스 제공을 지속하는 것이 부적절하다고 판단될 경우",
      ],
    },
    11: {
      6: [
        "① 회원이 서비스 가입 또는 회원정보 변경 시 허위 내용을 등록하는 행위",
        "② 회원이 서비스 가입 또는 사용을 위해 타인의 정보를 도용하는 행위",
        "③ 회원의 계정을 타인이 사용하도록 권한을 부여하는 행위, 대여 우산 이용권한을 양도 및 이전하는 행위, 대여 우산을 공동으로 이용하는 행위",
        "④ 업브렐라 대여, 반납 협업지점 이외의 임의의 장소 또는 관할 외 지역에 공유 우산을 방치하는 행위",
        "⑤ 업브렐라의 공유 우산을 개인 용도로 개조, 수리, 변형하는 행위 또는 업브렐라에 부착된 각종 장비를 임의로 제거하거나 다른 용도로 사용하는 행위",
        "⑥ 업브렐라의 서비스 운영을 고의적으로 방해하는 행위",
        "⑦ 정해진 보증금을 납부하지 않는 등 서비스를 부정한 방법으로 사용하는 행위",
        "⑧ 웹 상 게재된 이용안내 등에 저촉되는 우산 사용으로 정상적인 대여, 반납을 저해하는 행위",
        "⑨ 업브렐라 종사자의 인권을 부당하게 침해한 경우(폭언, 폭행, 성희롱, 업무방해 등)",
      ],
    },
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-start justify-center px-20 py-24 w-640">
        <div className="mb-40 font-bold text-gray-700 text-24 leading-32">업브렐라 이용약관</div>
        <div>
          {titles.map((title, index) => {
            const num: number = index + 1;
            const contents = detailedNumberContents[num];
            const circleContents = detailedCircleContents[num];
            return (
              <Content
                key={index}
                title={title}
                contents={contents}
                circleContents={circleContents}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default TermsOfService;

const Content = ({ title, contents, circleContents }: ContentProps) => {
  return (
    <div className="mb-40">
      <DetailedTitle title={title} />
      <div>
        {contents.map((content, index) => {
          return (
            <DetailedNumberContent
              key={index}
              number={index + 1}
              content={content}
              circleContents={circleContents ? circleContents[index + 1] : null}
            />
          );
        })}
      </div>
    </div>
  );
};

const DetailedTitle = ({ title }: DetailedTitleProps) => {
  return <div className="mb-8 font-semibold text-gray-700 text-16 leading-24">{title}</div>;
};

const DetailedNumberContent = ({ number, content, circleContents }: DetailedNumberContentProps) => {
  return (
    <div className="flex mb-4">
      <div className="mr-10">{number}. </div>
      <div className="font-normal text-gray-700 text-16 leading-24">
        <div>{content}</div>
        {circleContents
          ? circleContents.map((content, index) => {
              return (
                <div className="mb-4" key={index}>
                  {content}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
