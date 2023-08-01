import { FC, useEffect, useState } from "react"
import { useParams } from "react-router"
import { ProtectedRoute, Permissions } from "src/app/_index";
import { ModifyCoachFormProvider, ModifyFitnessFormProvider } from "./shared/FormProvider"
import { ModifyCoachForm } from "./coach/ModifyCoachForm"
import { ModifyFitnessForm } from "./fitness/ModifyFitnessForm"
import { Loading, filterAvoided } from "src/components/_index"
import { filter, routes } from "src/config/_index";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useServerData, useServerdataLazy } from "src/hooks/_index";
import { Coach, Fitness, getCoaches, getFilter, getFitnesses, getImage } from "src/fetcher/_index";
import { TransformedProviderObject } from "../_types";
import { useEffectOnce } from "@lukasbriza/lbui-lib";

const Modify: FC = () => {
    const { type, id } = useParams<{ type: "coach" | "fitness", id: string }>()
    const { data: filterResponse, loading } = useServerData(getFilter)
    const { fetchCall: fetchCoach, loading: coachLoading } = useServerdataLazy(getCoaches)
    const { fetchCall: fetchFitness, loading: fitnessLoading } = useServerdataLazy(getFitnesses)
    const { fetchCall: fetchImage, loading: imageLoading } = useServerdataLazy(getImage)
    const [providerObject, setProviderObject] = useState<TransformedProviderObject<Coach | Fitness>>()

    const { t } = useTranslation()

    const [isLoading, setIsLoading] = useState<boolean>()

    const filterCleared = filterResponse && filterResponse?.data
        ? filterAvoided(
            filterResponse.data,
            type === "coach"
                ? (filter.avoidFilterTypes.coach as unknown as string[])
                : (filter.avoidFilterTypes.fitness as unknown as string[])
        )
        : null;

    useEffectOnce(() => {
        if (id && type) {
            const response = type === "coach" ? fetchCoach({ id: id }) : fetchFitness({ id: id })
            response.then(async (value) => {
                if (value?.data) {
                    let pics = value?.data[0].pictures

                    const card: Blob = await fetchImage({ id: pics.card }) as Blob
                    const main: Blob = await fetchImage({ id: pics.detail.main }) as Blob
                    let others: File[] = []

                    if (pics.detail.others.length > 1) {
                        pics.detail.others.forEach(async (pictureId) => {
                            const result = await fetchImage({ id: pictureId }) as Blob
                            others.push(new File([result], result.name))
                        })
                    }

                    const pictureObject = {
                        card: new File([card], card.name),
                        detail: {
                            main: new File([main], main.name),
                            others: others
                        }
                    }
                    const { pictures, ...othervalues } = value.data[0]
                    setProviderObject({ ...othervalues, pictures: pictureObject })
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setIsLoading(loading || coachLoading || fitnessLoading || imageLoading || (Boolean(id) && providerObject === undefined))
    }, [loading, coachLoading, fitnessLoading, imageLoading, providerObject, id])

    return (
        <ProtectedRoute expectedPermission={Permissions.AUTHORIZED}>
            <section
                id="Modify"
                className={clsx(["relative", "stretch", "modify", "page"])}
            >
                <div className={clsx(["verticalText"])}>
                    {t("coachContentPage.verticalText")}
                </div>
                {isLoading ? <Loading /> :

                    type === "coach" ?
                        (
                            <ModifyCoachFormProvider defaultValues={providerObject as TransformedProviderObject<Coach>}>
                                <ModifyCoachForm
                                    type={type}
                                    regionOptions={filterCleared?.regions ?? []}
                                    othersOptions={filterCleared?.others ?? []}
                                    genderOptions={filterCleared?.gender ?? []}
                                    specializationOptions={filterCleared?.specialization ?? []}
                                />
                            </ModifyCoachFormProvider>
                        ) : type === "fitness" ?
                            (
                                <ModifyFitnessFormProvider defaultValues={providerObject as TransformedProviderObject<Fitness>}>
                                    <ModifyFitnessForm type={type} />
                                </ModifyFitnessFormProvider>
                            ) :
                            <Loading />
                }
            </section>
        </ProtectedRoute>

    )
}

export default Modify
