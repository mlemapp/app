export default function mergeRefs<T>(...refs: React.Ref<T>[]): React.Ref<T> {
    if (refs.length == 1) {
        return refs[0];
    }

    return (el) => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(el);
            } else {
                (ref as React.MutableRefObject<T | null>).current = el;
            }
        }
    };
}
