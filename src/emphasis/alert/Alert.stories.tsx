import * as React from "react";
import {storiesOf} from '@storybook/react';
import {Alert, AlertItem, AlertLevel, AlertSize, AlertType} from ".";
import Icon from "../../icon/Icon";

storiesOf('Alert', module)
    .add('Default Alerts', () =>
        <div style={{"width": "80em", padding: "3em"}}>
            <Alert type={AlertType.INFO} style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="info-standard"/>}>
                    Informational Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="error-standard"/>}>
                    Dangerous Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS} style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="success-standard"/>}>
                    Successful Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="warning-standard"/>}>
                    Warning Alert
                </AlertItem>
            </Alert>
        </div>
    )
    .add('Closable Alerts', () =>
        <div style={{"width": "80em", padding: "3em"}}>
            <Alert type={AlertType.INFO}
                   closeable
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="info-standard"/>}>
                    Informational Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER}
                   closeable
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="error-standard"/>}>
                    Dangerous Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS}
                   closeable
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="success-standard"/>}>
                    Successful Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} closeable>
                <AlertItem icon={<Icon shape="warning-standard"/>}>
                    Warning Alert
                </AlertItem>
            </Alert>
        </div>
    )
    .add('Multi-item alert', () =>
        <div style={{"width": "80em", padding: "3em"}}>
            <Alert type={AlertType.INFO}
                   style={{marginBottom: "2em"}}
                   closeable={true}>
                <AlertItem
                    icon={<Icon shape="info-standard"/>}>
                    Alert Item one
                </AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank"/>}>
                    Alert Item two
                </AlertItem>
                <AlertItem icon={<Icon shape="dollar"/>}>
                    Alert Item three
                </AlertItem>
                <AlertItem icon={<Icon shape="asterisk"/>}>
                    Alert Item four
                </AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER}
                   style={{marginBottom: "2em"}}
                   closeable={true}>
                <AlertItem icon={<Icon shape="info-standard"/>}>
                    Alert Item one
                </AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank"/>}>
                    Alert Item two
                </AlertItem>
                <AlertItem icon={<Icon shape="dollar"/>}>
                    Alert Item three
                </AlertItem>
                <AlertItem icon={<Icon shape="asterisk"/>}>
                    Alert Item four
                </AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS}
                   style={{marginBottom: "2em"}}
                   closeable={true}>
                <AlertItem icon={<Icon shape="info-standard"/>}>
                    Alert Item one
                </AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank"/>}>
                    Alert Item two
                </AlertItem>
                <AlertItem icon={<Icon shape="dollar"/>}>
                    Alert Item three
                </AlertItem>
                <AlertItem icon={<Icon shape="asterisk"/>}>
                    Alert Item four
                </AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING}
                   style={{marginBottom: "2em"}}
                   closeable={true}>
                <AlertItem icon={<Icon shape="info-standard"/>}>
                    Alert Item one
                </AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank"/>}>
                    Alert Item two
                </AlertItem>
                <AlertItem icon={<Icon shape="dollar"/>}>
                    Alert Item three
                </AlertItem>
                <AlertItem icon={<Icon shape="asterisk"/>}>
                    Alert Item four
                </AlertItem>
            </Alert>
        </div>
    )
    .add('Compact Alerts', () =>
        <div style={{"width": "80em", padding: "3em"}}>
            <Alert type={AlertType.INFO}
                   size={AlertSize.COMPACT}
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="info-standard"/>}>
                    Informational Standard
                </AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER}
                   size={AlertSize.COMPACT}
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="error-standard"/>}>
                    Dangerous Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS}
                   size={AlertSize.COMPACT}
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="success-standard"/>}>
                    Successful Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} size={AlertSize.COMPACT}>
                <AlertItem icon={<Icon shape="warning-standard"/>}>
                    Warning Alert
                </AlertItem>
            </Alert>
        </div>
    )
    .add('App Level Alerts', () =>
        <div style={{"width": "80em", padding: "3em"}}>
            <Alert type={AlertType.INFO}
                   level={AlertLevel.APP}
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="info-standard"/>}>
                    Informational Standard
                </AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER}
                   level={AlertLevel.APP}
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="error-standard"/>}>
                    Dangerous Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS}
                   level={AlertLevel.APP}
                   style={{marginBottom: "2em"}}>
                <AlertItem icon={<Icon shape="success-standard"/>}>
                    Successful Alert
                </AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING}
                   level={AlertLevel.APP}>
                <AlertItem icon={<Icon shape="warning-standard"/>}>
                    Warning Alert
                </AlertItem>
            </Alert>
        </div>
    )
;
