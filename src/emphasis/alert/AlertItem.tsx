import * as React from 'react';
import {ReactElement, ReactNode} from 'react';
import Icon from "../../icon/Icon";
import * as utils from "../../utils";

export type AlertItemProps = {
    actions?: ReactElement
    children?: ReactNode | ReactNode[]
    icon?: ReactElement
    static?: boolean
};

export class AlertItem extends React.PureComponent<AlertItemProps> {

    private static iconWithAlertClass(icon: ReactElement): Icon {
        return React.cloneElement(icon, {
            className: "alert-icon " + icon.props.className
        }) as ReactNode as Icon;
    }

    private static renderActions(actions: React.ReactElement): ReactElement[] {
        return React.Children.map(actions, child => {
            return React.cloneElement(child, {
                className: child.props.className + " alert-action"
            });
        });
    }

    render() {
        const {actions, children, icon} = this.props;
        let classNames = ["alert-item"];
        if (this.props.static)
            classNames.push("static");
        return (
            <div className={utils.classNames(classNames)}>
                {icon &&
                <div className="alert-icon-wrapper">
                    {AlertItem.iconWithAlertClass(icon)}
                </div>
                }
                <div className="alert-text">
                    {children}
                </div>
                { actions &&
                    <div className="alert-actions">
                        {AlertItem.renderActions(actions)}
                    </div>
                }
            </div>
        );
    }
}