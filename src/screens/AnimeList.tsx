import React, { useEffect, useState } from 'react';
import { Button, Dimensions, FlatList, Image, ListRenderItemInfo, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { animesReceived, deleteAnime, shuffleAnimes } from "../store/animeReducer";
import animeService from '../api/animeService'
import { Anime } from "../api/models/Anime";
import RenderIf from "../utility/renderIf";
import LottieView from 'lottie-react-native'
import ShuffleIcon from '../../assets/svg/shuffle.svg'
import { useNavigation } from "@react-navigation/native";
import Screens from "../config/Screens";

const AnimeList: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch()
    const animes = useAppSelector(store => store.anime.animes)
    const navigator = useNavigation<any>()

    const getData = async () => {
        animeService.getAnimes()
            .then(({data: animes}) => {
                dispatch(animesReceived(animes))

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setIsLoading(true)
        dispatch(getData)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    const renderAnime = ({item}: ListRenderItemInfo<Anime>) => (
        <Pressable onPress={() => navigator.navigate({name: Screens.ANIME_DETAILS, params: {animeId: item._id}})}>
            <RenderIf condition={item.imageURL !== undefined}>
                <Image source={{uri: item.imageURL}}
                       style={styles.animeImage}/>
            </RenderIf>
            <Text>{item.name}</Text>
        </Pressable>
    )

    return (
        <>
            <RenderIf condition={isLoading}>
                <LottieView source={require('../../assets/anime-loading.json')} autoPlay loop/>
            </RenderIf>

            <RenderIf condition={!isLoading}>
                <SafeAreaView style={{flex: 1}}>
                    <FlatList data={animes}
                              keyExtractor={(item) => item._id.substr(10)}
                              renderItem={renderAnime}
                              numColumns={3}/>

                    <Pressable onPress={() => dispatch(shuffleAnimes())}
                               style={{
                                   position: 'absolute',
                                   bottom: 20,
                                   right: 20,
                                   backgroundColor: '#000',
                                   height: 60,
                                   width: 60,
                                   borderRadius: 30,
                                   justifyContent: 'center',
                                   alignItems: 'center'
                               }}>
                        <ShuffleIcon fill={'#fff'} width={25} height={25}/>
                    </Pressable>
                </SafeAreaView>
            </RenderIf></>
    );
}

const styles = StyleSheet.create({
    animeImage: {
        height: 80,
        width: Dimensions.get('window').width / 3
    }
})

export default AnimeList;
