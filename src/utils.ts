export function classNames(classNameList: (false|undefined|null|string)[]) {
    return classNameList.filter(x => typeof x === 'string').join(' ');
}

