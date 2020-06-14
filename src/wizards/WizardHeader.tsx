import React from "react";
import {classNames} from "../utils";
import {ClassNames, Styles} from "./ClassNames";
import {Icon} from "../icon";

type WizardHeaderProps = {
    closable: boolean;
    closeIcon: Icon;
    title?: string;
    showTitle: boolean;
    onClose?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export default class WizardHeader extends React.PureComponent<WizardHeaderProps> {
    static defaultProps = {
        closable: true,
        closeIcon: <Icon aria-hidden={true} shape="close" />,
        showTitle: true,
    };

    render() {
        const {closable, closeIcon, onClose, showTitle, title} = this.props;
        const classNameList = classNames([ClassNames.MODAL_HEADER, ClassNames.NG_TNS]);
        const wrapperClassNameList = classNames([ClassNames.MODAL_TITLE_WRAPPER, ClassNames.NG_TNS]);
        const titleClassNameList = classNames([ClassNames.MODAL_TITLE, ClassNames.NG_TNS]);
        const closeButtonClassNameList = classNames([ClassNames.CLOSE, ClassNames.NG_TNS, ClassNames.NG_STAR_INSERTED]);
        return (
            <div className={classNameList}>
                {closable && (
                    <button aria-label="Close" className={closeButtonClassNameList} type="button" onClick={onClose}>
                        {closeIcon}
                    </button>
                )}
                <div className={wrapperClassNameList}>
                    <h3 className={titleClassNameList} style={Styles.MODAL_TITLE_STYLE}>
                        <span className={ClassNames.MODAL_TITLE_TEXT}>{showTitle && title}</span>
                    </h3>
                </div>
            </div>
        );
    }
}
