import { Spinner as PhSpinner } from '@phosphor-icons/react';

export default function Spinner({ centered }: { centered?: boolean }) {
    return <PhSpinner className={`animate-spin ${centered ? 'm-auto' : ''}`} size="24" />;
}
