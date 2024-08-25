import { createSlice } from "@reduxjs/toolkit";

const weatherSlice: any = createSlice({
    name: 'weather',
    initialState: {
        searched: false,
        theme: 'light',
        isInValidSearch: false,
        recentSearches: [''],
        userLocation: {}, current: {},
        hourly: {}, foreCast: {},
        loading: {
            isCurrentLoading: false,
            isHourlyLoading: false,
            isForeCastLoading: false
        }
    },
    reducers: {
        setSearched(state, action) {
            state.searched = action.payload
        },
        changeTheme(state, action){
            state.theme = action.payload
        }, 
        setRecentSearches(state, action){
            state.recentSearches.push(action.payload)
        },
        syncFromLocalStorage(state, action){
            state.recentSearches = action.payload
        },
        getUserLocation(state, action) {
            if (state.searched) state.userLocation = { city: action.payload.city }
            else state.userLocation = { latitude: action.payload.latitude, longitude: action.payload.longitude }
        },
        getCurrentData(state, action) {
            state.current = action.payload
        },
        getHourlydata(state, action) {
            state.hourly = action.payload
        },
        getForeCast(state, action) {
            state.foreCast = action.payload
        },
        setIsInValidSearch(statee,action){
            statee.isInValidSearch = action.payload
        },
        setIsCurrentLoading(state, action) {
            state.loading.isCurrentLoading = action.payload
        },
        setIsHourlyLoading(state, action) {
            state.loading.isHourlyLoading = action.payload
        },
        setIsForeCastLoading(state, action) {
            state.loading.isForeCastLoading = action.payload
        }
    }
})

const {
    setSearched,
    changeTheme,
    getCurrentData,
    setRecentSearches,
    syncFromLocalStorage,
    getUserLocation,
    getHourlydata,
    getForeCast,
    setIsInValidSearch,
    setIsCurrentLoading,
    setIsHourlyLoading,
    setIsForeCastLoading } = weatherSlice.actions

export {
    weatherSlice,
    changeTheme,
    setSearched,
    setRecentSearches,
    syncFromLocalStorage,
    getUserLocation,
    getHourlydata,
    getForeCast,
    setIsInValidSearch,
    setIsCurrentLoading,
    setIsHourlyLoading,
    setIsForeCastLoading,
    getCurrentData
}