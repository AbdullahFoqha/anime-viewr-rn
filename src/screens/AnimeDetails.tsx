import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import animeService from '../api/animeService'
import { setSelected } from "../store/animeReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import RenderIf from "../utility/renderIf";
import LottieView from "lottie-react-native";

const AnimeDetails: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const route = useRoute<any>()
    const {animeId} = route.params
    const dispatch = useAppDispatch()
    const anime = useAppSelector(store => store.anime.selectedAnime)
    const navigation = useNavigation()

    const getAnimeData = () => {
        animeService.getAnimeDetails(animeId)
            .then(res => {
                dispatch(setSelected(res.data))
                navigation.setOptions({title: res.data.name})
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setIsLoading(true)
        getAnimeData()
        setTimeout(() => {
            setIsLoading(false)
        }, 700)
    }, [])

    return (
        <>
            <RenderIf condition={isLoading}>
                <LottieView source={require('../../assets/anime-loading.json')} autoPlay loop/>
            </RenderIf>

            <RenderIf condition={!isLoading}>
                <SafeAreaView style={styles.container}>
                    <Image source={{uri: anime?.imageURL}} style={{width: '100%', height: '80%'}}/>
                    <Text style={{fontSize: 50}}>{anime?.name}</Text>
                    <Text style={{fontSize: 25}}>{anime?.year}</Text>
                </SafeAreaView>
            </RenderIf>
        </>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AnimeDetails;
