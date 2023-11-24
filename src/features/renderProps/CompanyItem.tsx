import { Company } from "@/utils";
import { useState } from "react";

type CompanyItemProps = {
  company: Company;
  defaultVisibility: boolean;
};

export const CompanyItem = ({
  company,
  defaultVisibility,
}: CompanyItemProps) => {
  const [isVisible, setIsVisible] = useState(defaultVisibility);

  const changeToVisibleHandler = () => setIsVisible(true);
  const changeToNotVisibleHandler = () => setIsVisible(false);

  return (
    <li
      className="company"
      onMouseEnter={changeToVisibleHandler}
      onMouseLeave={changeToNotVisibleHandler}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
};
