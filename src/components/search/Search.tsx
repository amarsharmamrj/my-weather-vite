import { useState } from "react"
import { setSearched, getUserLocation, setIsInValidSearch } from "../../redux/slices/weatherSlice"
import { useDispatch, useSelector } from "react-redux"
import "./Search.css"
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_KEY, dangerouslyAllowBrowser: true });

const Search = () => {
    const dispatch = useDispatch()
    const { isInValidSearch } = useSelector((store: any) => store.weather)
    const [city, setCity] = useState('')

    const extractCityName = async (cityName: string) => {
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: cityName }],
            stream: true,
        });
        for await (const chunk of stream) {
            console.log("openAi:", chunk.choices[0]?.delta?.content || "")
        }
    }

    const handleOnChange = (e: any) => {
        setCity(e.target.value)
        dispatch(setIsInValidSearch(false))
    }

    const handleSearch = () => {
        dispatch(setSearched(true))
        dispatch(getUserLocation({ city: city }))
        setCity('')

        extractCityName(city)
    }

    const handleKeyUp = (e: any) => {
        if (e.keyCode == 13) handleSearch()
    }

    return (
        <div className="search-box">
            <div className="inner">
                <input type="text" className="search" value={city} onChange={handleOnChange} onKeyUp={handleKeyUp} />
                <button type="submit" onClick={handleSearch} className="search-button">Search</button>
            </div>
            {
                isInValidSearch && (
                    <p className="error">Try valid city name!</p>
                )
            }
        </div>
    )
}

export default Search