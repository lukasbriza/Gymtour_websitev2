import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { TextArea } from "src/components";
import { useField } from "src/hooks";
import { MappedCoachValues, MappedFitnessValues } from "src/utils";

export const AboutSection: FC = () => {
  const { t } = useTranslation();
  const { buildField } = useField();
  const {
  } = useFormContext<MappedCoachValues | MappedFitnessValues>();
  const { register, ...otherProps } = buildField("descriptionFull");

  return (
    <section
      className={clsx(["modifySection", "aboutSection", "glassMorphism"])}
    >
      <div>
        <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>
          {t("modifyPage.aboutSection.aboutHeader")}
        </h2>
        <p>{t("modifyPage.aboutSection.aboutContent")}</p>
      </div>
      <TextArea
        {...register("descriptionFull")}
        {...otherProps}
        label={t("common.about")}
        helperRootClass="aboutWrapperClass"
        requiredStar={true}
      />
    </section>
  );
};