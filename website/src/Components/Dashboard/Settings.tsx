import { useEffect, useContext, useState } from 'react'
import { FormStringInput } from '../FormStringInput'
import { Underliner } from '../Underliner'
import { FormModal } from '../FormModal'
import { saveToken, getToken } from '../../Functions/loginLogic'
import {
    emailUpdateSucess,
    emailUpdateErrorHtml,
    nameUpdateSucess,
    inputErrorHtml,
    passwordUpdateErrorHtml,
    wrongPassword,
    passwordUpdateSucess,
    nameUpdateErrorHtml
} from './modalObjects'
import fetchAgent from '../../Functions/fetchAgent'
import { gsap } from 'gsap'
//FUNCTIONS//
import { classListMaker } from '../../Functions/classListMaker'
//CONFIG//
import { text } from '../../config/textSource'
//CONTEXT//
import { UserContext } from '../../App/Context'


const Settings = () => {
    //////////////////////////////////////////////////
    //STATE//
    interface stateType {
        canSubmit: boolean, value: string
    }
    const [newName, setNewName] = useState<stateType>()
    const [oldPassword, setOldPassword] = useState<stateType>()
    const [newPassword, setNewPassword] = useState<stateType>()
    const [newEmail, setNewEmail] = useState<stateType>()

    const [passwordDisabledButton, setPasswordDisabledButton] = useState<boolean>(true)
    const [usernameDisabledButton, setUsernameDisabledButton] = useState<boolean>(true)
    const [emailDisabledButton, setEmailDisabledButton] = useState<boolean>(true)

    const [modal, showModal] = useState<modalType>({ loading: false, sucess: undefined, msg: undefined })
    //////////////////////////////////////////////////
    //VARIABLES//
    const errorStyle = {
        borderColor: "red",
        borderWidth: "3px"
    }
    const sucessStyle = {
        borderColor: "rgb(0, 180, 0)",
        borderWidth: "3px"
    }

    const settingsClasses = classListMaker(["settings", "dashboardSection"])
    const nameInputClasses = classListMaker(["changeNameInput"])
    const newPasswordInputClasses = classListMaker(["newPasswordInput"])
    const oldPasswordInputClasses = classListMaker(["oldPasswordInput"])
    const emailInputClasses = classListMaker(["changeEmailInput"])

    const userContext = useContext(UserContext)
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const showAuthError = () => {
        showModal({ loading: false, sucess: false, msg: wrongPassword })
    }
    const handleChange = (input: { canSubmit: boolean, value: string, name: string }) => {
        switch (input.name) {
            case 'nameInput':
                setNewName({ canSubmit: input.canSubmit, value: input.value })
                break
            case 'oldPasswordInput':
                setOldPassword({ canSubmit: input.canSubmit, value: input.value })
                break
            case 'newPasswordInput':
                setNewPassword({ canSubmit: input.canSubmit, value: input.value })
                break
            case 'emailInput':
                setNewEmail({ canSubmit: input.canSubmit, value: input.value })
                break
        }
    }
    const handleModalDefault = () => {
        showModal({ loading: false, sucess: undefined, msg: undefined })
    }
    const clearForm = () => {
        setNewName(undefined)
        setOldPassword(undefined)
        setNewPassword(undefined)
        setNewEmail(undefined)
        setPasswordDisabledButton(true)
        setEmailDisabledButton(true)
        setUsernameDisabledButton(true)
        gsap.set(".changeEmailInput", { value: "" })
    }
    const nameSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        //START LOADING ANIMATION//
        showModal({ loading: true, sucess: undefined, msg: undefined })

        //CONTROL IF INPUTS ARE VALID//
        if (newName?.canSubmit === false) {
            //CANSUBMIT ERROR//
            showModal({ loading: false, sucess: false, msg: inputErrorHtml })
            return
        }
        if (newName?.canSubmit === true) {
            //VALIDATE AUTHENTICATION VIA TOKEN//
            const token = await getToken()
            const fetchResult = await fetchAgent.checkAuthOfUser({ token: String(token) })
            //HANDLE FETCH ERROR MAP ARRAY//
            if (fetchResult.errorMap.length > 0) {
                showModal({ loading: false, sucess: false, msg: nameUpdateErrorHtml })
                return
            }
            if (fetchResult.data?.authenticated === true) {
                const token = await getToken()
                const fetchResult = await fetchAgent.changeUserInformation({
                    _id: String(userContext?.userObject?._id),
                    token: String(token),
                    type: "username",
                    value: newName.value
                })
                //HANDLE FETCH ERROR MAP ARRAY//
                if (fetchResult.errorMap.length > 0) {
                    let msgText = fetchResult.errorMap.map((err, index: number) => {
                        const errorHtml = (
                            <div className="modalErrorObj" key={index}>
                                <p className="modalErrorHeader" key={index + "a"}>{err.Error?.code + "- " + err.Error?.name}</p>
                                <p className="modalErrorContent" key={index + "b"}>{err.Error?.message}</p>
                            </div>
                        )
                        return errorHtml;
                    })
                    showModal({ loading: false, sucess: false, msg: msgText })
                    return
                }
                //HANDLE FAILED UPDATE//
                if (fetchResult.data?.updated === false) {
                    showModal({ loading: false, sucess: false, msg: nameUpdateErrorHtml })
                    return
                }
                //HANDLE SUCESS UPDATE//
                if (fetchResult.data?.updated === true) {
                    showModal({ loading: false, sucess: true, msg: nameUpdateSucess })
                    return
                }
            } else {
                showAuthError()
                return
            }
        }
    }
    const passwordSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        //START LOADING ANIMATION//
        showModal({ loading: true, sucess: undefined, msg: undefined })

        //CONTROL IF INPUTS ARE VALID//
        if (newPassword?.canSubmit === false || oldPassword?.canSubmit === false) {
            //CANSUBMIT ERROR//
            showModal({ loading: false, sucess: false, msg: inputErrorHtml })
            return
        }
        if (newPassword?.canSubmit === true && oldPassword?.canSubmit === true) {
            //VALIDATION IF OLD PASSWORD IS RIGHT//
            const fetchResult = await fetchAgent.loginUser({
                username: String(userContext?.userObject?.username),
                password: oldPassword.value
            })
            console.log(fetchResult)
            //SAVE NEW TOKEN//
            if (fetchResult.data?.token !== undefined && fetchResult.data?.authenticated === true) {
                saveToken(fetchResult.data.token)
            }

            if (fetchResult.data?.authenticated) {
                const token = await getToken()
                //FETCH DATA AND WAIT FOR RESULT//
                const fetchResult = await fetchAgent.changeUserInformation({
                    _id: String(userContext?.userObject?._id),
                    type: "password",
                    token: String(token),
                    value: newPassword.value
                })
                //HANDLE FETCH ERROR MAP ARRAY//
                if (fetchResult.errorMap.length > 0) {
                    let msgText = fetchResult.errorMap.map((err, index: number) => {
                        const errorHtml = (
                            <div className="modalErrorObj" key={index}>
                                <p className="modalErrorHeader" key={index + "a"}>{err.Error?.code + "- " + err.Error?.name}</p>
                                <p className="modalErrorContent" key={index + "b"}>{err.Error?.message}</p>
                            </div>
                        )
                        return errorHtml;
                    })
                    showModal({ loading: false, sucess: false, msg: msgText })
                    return
                }
                //HANDLE FAILED UPDATE//
                if (fetchResult.data?.updated === false) {
                    showModal({ loading: false, sucess: false, msg: passwordUpdateErrorHtml })
                    return
                }
                //HANDLE SUCESS UPDATE//
                if (fetchResult.data?.updated === true) {
                    showModal({ loading: false, sucess: true, msg: passwordUpdateSucess })
                    return
                }

            } else {
                showAuthError()
                return
            }
        }

    }
    const emailSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        //START LOADING ANIMATION//
        showModal({ loading: true, sucess: undefined, msg: undefined })

        //CONTROL IF INPUTS ARE VALID//
        if (newEmail?.canSubmit === false) {
            //SHOW MODAL, STOP LOADING ANIMATION, SHOW MESSAGES//
            showModal({ loading: false, sucess: false, msg: inputErrorHtml })
            return
        }
        if (newEmail?.canSubmit === true) {
            //VALIDATE AUTHENTICATION VIA TOKEN//
            const token = await getToken()
            const fetchResult = await fetchAgent.checkAuthOfUser({ token: String(token) })

            //HANDLE FETCH ERROR MAP ARRAY//
            if (fetchResult.errorMap.length > 0) {
                showModal({ loading: false, sucess: false, msg: emailUpdateErrorHtml })
                return
            }
            if (fetchResult.data?.authenticated === true) {
                const token = await getToken()
                const fetchResult = await fetchAgent.changeUserInformation({
                    _id: String(userContext?.userObject?._id),
                    token: String(token),
                    type: "email",
                    value: newEmail.value
                })
                //HANDLE FETCH ERROR MAP ARRAY//
                if (fetchResult.errorMap.length > 0) {
                    let msgText = fetchResult.errorMap.map((err, index: number) => {
                        const errorHtml = (
                            <div className="modalErrorObj" key={index}>
                                <p className="modalErrorHeader" key={index + "a"}>{err.Error?.code + "- " + err.Error?.name}</p>
                                <p className="modalErrorContent" key={index + "b"}>{err.Error?.message}</p>
                            </div>
                        )
                        return errorHtml;
                    })
                    showModal({ loading: false, sucess: false, msg: msgText })
                    return
                }
                //HANDLE FAILED UPDATE//
                if (fetchResult.data?.updated === false) {
                    showModal({ loading: false, sucess: false, msg: emailUpdateErrorHtml })
                    return
                }
                //HANDLE SUCESS UPDATE//
                if (fetchResult.data?.updated === true) {
                    showModal({ loading: false, sucess: true, msg: emailUpdateSucess })
                    return
                }
            } else {
                showAuthError()
                return
            }
        }
    }
    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        if (oldPassword !== undefined && newPassword !== undefined) {
            if (oldPassword?.value.length > 0 && newPassword?.value.length > 0) {
                setPasswordDisabledButton(false)
            } else {
                setPasswordDisabledButton(true)
            }
        }
    }, [oldPassword, newPassword])
    useEffect(() => {
        if (newName !== undefined) {
            newName?.value.length > 0 ? setUsernameDisabledButton(false) : setUsernameDisabledButton(true)
        }
    }, [newName])
    useEffect(() => {
        if (newEmail !== undefined) {
            newEmail?.value.length > 0 ? setEmailDisabledButton(false) : setEmailDisabledButton(true)
        }
    }, [newEmail])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <>
            <section className={settingsClasses}>
                <div className="headerWrapper centerX relative">
                    <h1>{text.dahboard.Settings.header.cz}</h1>
                    <Underliner width={"90%"} id={"settingsUnderliner"} color={"black"} />
                </div>
                <p className="settingsText">{text.dahboard.Settings.text.cz}</p>
                <section className="dataChangeRequestWrapper">

                    <form action="#changeNameForm" id="changeNameForm" className="settingsForm" onSubmit={() => { console.log("submit") }}>
                        <h4>{text.dahboard.Settings.form.header1.cz}</h4>
                        <div className="formDivider"></div>
                        <FormStringInput
                            className={nameInputClasses}
                            type={"text"}
                            name={"nameInput"}
                            formId={"changeNameForm"}
                            placeholder={text.dahboard.Settings.form.input1.placeholder.cz}
                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                            required={false}
                            pattern={'[ |!()*ˇ^´˘°˛`˙´˝¨¸ß×¤÷]'}
                            errorMessage={text.dahboard.Settings.form.input1.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                            maxLength={30}
                            minLength={5}
                        />
                        <button
                            className="changeNameFormButton settingsFormButton"
                            type="submit"
                            onClick={nameSubmit}
                            disabled={usernameDisabledButton}
                        >
                            {text.dahboard.Settings.form.button1.cz}
                        </button>
                    </form>

                    <form action="#changePasswordForm" id="changePasswordForm" className="settingsForm" onSubmit={() => { console.log("submit") }}>
                        <h4 id="oldPasswordHeader">{text.dahboard.Settings.form.header2.cz}</h4>
                        <h4 id="newPasswordHeader">{text.dahboard.Settings.form.header3.cz}</h4>
                        <div className="formDivider changePasswordDivider"></div>
                        <div className="formDivider changePasswordDivider-mobile"></div>
                        <FormStringInput
                            className={oldPasswordInputClasses}
                            type={"password"}
                            name={"oldPasswordInput"}
                            formId={"changePasswordForm"}
                            placeholder={text.dahboard.Settings.form.input2.placeholder.cz}
                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                            required={false}
                            errorMessage={text.dahboard.Settings.form.input2.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                            minLength={9}
                        />
                        <FormStringInput
                            className={newPasswordInputClasses}
                            type={"password"}
                            name={"newPasswordInput"}
                            formId={"changePasswordForm"}
                            placeholder={text.dahboard.Settings.form.input3.placeholder.cz}
                            onChange={(canSubmit) => { handleChange(canSubmit); }}
                            required={false}
                            errorMessage={text.dahboard.Settings.form.input3.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                            minLength={9}
                        />
                        <button
                            className="changePasswordFormButton settingsFormButton"
                            type="submit"
                            onClick={passwordSubmit}
                            disabled={passwordDisabledButton}
                        >
                            {text.dahboard.Settings.form.button2.cz}
                        </button>
                    </form>

                    <form action="#changeEmailForm" id="changeEmailForm" className="settingsForm">
                        <h4>Nový email:</h4>
                        <div className="formDivider"></div>
                        <FormStringInput
                            className={emailInputClasses}
                            type={"email"}
                            name={"emailInput"}
                            formId={"changeEmailForm"}
                            placeholder={text.dahboard.Settings.form.input4.placeholder.cz}
                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                            required={true}
                            errorMessage={text.dahboard.Settings.form.input4.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                        />
                        <button
                            className="changeEmailFormButton settingsFormButton"
                            type="submit"
                            onClick={emailSubmit}
                            disabled={emailDisabledButton}
                        >
                            {text.dahboard.Settings.form.button3.cz}
                        </button>
                    </form>
                </section>
            </section>
            <FormModal
                loading={modal.loading}
                sucess={modal.sucess}
                msg={modal.msg}
                callback={handleModalDefault}
                clearForm={clearForm}
            />
        </>
    )
}

export { Settings } 