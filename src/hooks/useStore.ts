import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from '../lib/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: (selector: (state: RootState) => unknown) => unknown = useSelector
export const useAppStore = () => useStore<AppStore>()