import * as React from "react";
import {Icon, Direction} from "../../icon";
import Moment from "moment";
import {classNames} from "../../utils";
import {Input} from "../input";

export type DatePickerProps = {
    value?: Date;
    locale?: string;
    defaultValue?: Date;
};

export type DatePickerState = {
    isOpen: boolean;
    value: Moment.Moment;
    navValue: Moment.Moment;
    viewMode: ViewMode;
};

enum ViewMode {
    Day,
    Month,
    Year,
}

const NO_OF_DAYS_IN_A_WEEK: number = 7;
const NO_OF_ROWS_IN_CALENDAR_VIEW: number = 6;
const TOTAL_DAYS_IN_DAYS_VIEW: number = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;

export class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {
    static defaultProps: DatePickerProps = {
        locale: "en",
        defaultValue: new Date(),
    };

    state: DatePickerState = {
        viewMode: ViewMode.Day,
        isOpen: false, // prettier
        value: this.props.value !== undefined ? Moment(this.props.value) : Moment(this.props.defaultValue),
        navValue: this.props.value !== undefined ? Moment(this.props.value) : Moment(this.props.defaultValue),
    };

    handleClick() {
        const {isOpen} = this.state;
        this.setState({
            isOpen: !isOpen,
            viewMode: ViewMode.Day,
            navValue: this.props.value !== undefined ? Moment(this.props.value) : Moment(this.props.defaultValue),
        });
    }

    private static numDaysFromPrevMonth(year: number, month: number): number {
        let tempDate = Moment();
        tempDate.year(year);
        tempDate.month(month);
        tempDate.date(1);
        return tempDate.day();
    }

    private static numDaysFromNextMonth(year: number, month: number): number {
        let tempDate = Moment();
        tempDate.year(year);
        tempDate.month(month);
        return TOTAL_DAYS_IN_DAYS_VIEW - (DatePicker.numDaysFromPrevMonth(year, month) + tempDate.daysInMonth());
    }

    private static daysInTheMonth(state: DatePickerState) {
        const selectedDate = Moment(state.value);
        const {navValue} = state;
        const currentMonth = navValue.month();
        const currentYear = navValue.year();
        const daysFromPrevMonth = DatePicker.numDaysFromPrevMonth(selectedDate.year(), selectedDate.month());
        const daysFromNextMonth = DatePicker.numDaysFromNextMonth(selectedDate.year(), selectedDate.month());

        let calendar = Moment()
            .year(currentYear)
            .month(currentMonth)
            .date(1);
        calendar.subtract(daysFromPrevMonth, "days");

        const selectedSameMonth = selectedDate.isSame(navValue, "month");

        const weeks: any = [];
        [0, 1, 2, 3, 4, 5].map(() => {
            const days: any = [];
            [0, 1, 2, 3, 4, 5, 6].map(() => {
                const isToday = calendar.isSame(Moment(), "day"); // are we on today?
                const isSelected = calendar.isSame(selectedDate, "day"); // are we on selected?
                const isDisabled = !navValue.isSame(calendar, "month");
                const day = (
                    <td className="calendar-cell">
                        <div className="day">
                            <button
                                type="button"
                                className={classNames([
                                    "day-btn", // prettier
                                    isSelected && !isToday && "is-selected",
                                    isToday && "is-today",
                                    isDisabled && "is-disabled",
                                ])}
                                tabIndex={selectedSameMonth ? (isSelected ? 0 : -1) : isToday ? 0 : -1}
                                autoFocus={selectedSameMonth ? (isSelected ? true : false) : isToday ? true : false}
                            >
                                {calendar.date()}
                            </button>
                        </div>
                    </td>
                );
                days.push(day);
                calendar.add(1, "day");
            });
            weeks.push(<tr className="calendar-row">{days}</tr>);
        });
        return weeks;
    }

    toggleViewMode(mode: ViewMode) {
        this.setState({viewMode: mode});
    }

    toggleNavValueMonth(month: number) {
        const newValue = Moment(this.state.navValue);
        newValue.month(month);
        this.setState({viewMode: ViewMode.Day, navValue: newValue});
    }

    render() {
        const {isOpen, viewMode} = this.state;
        const navValue = Moment(this.state.navValue);
        const {locale} = this.props;

        const weekDaysHtml = Moment.weekdaysShort(true).map(day => {
            return <td className="calendar-cell weekday">{day.substring(0, 1)}</td>;
        });

        return (
            <div className="clr-control-container">
                <div className="clr-input-wrapper">
                    <div className="clr-input-group">
                        <input
                            type="text"
                            className="clr-input"
                            placeholder={Moment.localeData(locale).longDateFormat("L")}
                        />
                        <button
                            className="clr-input-group-icon-action"
                            type="button"
                            title="Open"
                            onClick={this.handleClick.bind(this)}
                        >
                            <Icon shape="calendar" />
                        </button>
                        {isOpen && (
                            <div className="datepicker">
                                {viewMode === ViewMode.Day && (
                                    <div className="daypicker">
                                        <div className="calendar-header">
                                            <div className="calendar-pickers">
                                                <button
                                                    className="calendar-btn monthpicker-trigger"
                                                    type="button"
                                                    onClick={this.toggleViewMode.bind(this, ViewMode.Month)}
                                                >
                                                    {navValue.format("MMM")}
                                                </button>
                                                <button
                                                    className="calendar-btn yearpicker-trigger"
                                                    type="button"
                                                    onClick={this.toggleViewMode.bind(this, ViewMode.Year)}
                                                >
                                                    {navValue.format("YYYY")}
                                                </button>
                                            </div>
                                            <div className="calendar-switchers">
                                                <button className="calendar-btn switcher" type="button">
                                                    <Icon shape="angle" dir={Direction.LEFT} />
                                                </button>
                                                <button className="calendar-btn switcher" type="button">
                                                    <Icon shape="event" />
                                                </button>
                                                <button className="calendar-btn switcher" type="button">
                                                    <Icon shape="angle" dir={Direction.RIGHT} />
                                                </button>
                                            </div>
                                        </div>
                                        <table className="calendar-table weekdays">
                                            <tbody>
                                                <tr className="calendar-row">{weekDaysHtml}</tr>
                                            </tbody>
                                        </table>
                                        <table className="calendar-table calendar-dates">
                                            {DatePicker.daysInTheMonth(this.state)}
                                        </table>
                                    </div>
                                )}
                                {viewMode === ViewMode.Month && (
                                    <div className="monthpicker">
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month: number) => {
                                            return (
                                                <button
                                                    type="button" //prettier
                                                    className={classNames([
                                                        "calendar-btn", //prettier
                                                        "month",
                                                        month === 0 && "is-selected",
                                                    ])}
                                                    autoFocus={month === 0 ? true : false}
                                                    tabIndex={month === 0 ? 0 : -1}
                                                    onClick={this.toggleNavValueMonth.bind(this, month)}
                                                >
                                                    {Moment()
                                                        .month(month)
                                                        .format("MMMM")}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                {viewMode === ViewMode.Year && (
                                    <div className="yearpicker">
                                        <div className="year-switchers">
                                            <button type="button" className="calendar-btn switcher">
                                                <Icon shape="angle" dir={Direction.LEFT} />
                                            </button>
                                            <button type="button" className="calendar-btn switcher">
                                                <Icon shape="event" />
                                            </button>
                                            <button type="button" className="calendar-btn switcher">
                                                <Icon shape="angle" dir={Direction.RIGHT} />
                                            </button>
                                        </div>
                                        <div className="years">
                                            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((year: number) => {
                                                return (
                                                    <button type="button" className="calendar-btn year">
                                                        {Moment(navValue)
                                                            .subtract(year, "year")
                                                            .format("YYYY")}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
