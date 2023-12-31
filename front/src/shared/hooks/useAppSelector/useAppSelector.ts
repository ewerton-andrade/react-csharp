import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AppStore } from '../../../store';

const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;

export default useAppSelector;