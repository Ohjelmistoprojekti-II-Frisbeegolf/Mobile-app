import React, { useState, useEffect } from 'react'
import { View, Avatar, Text, Button, AlertDialog, VStack, HStack, Divider, ZStack, Box } from 'native-base';
import { styles } from './StyleSheet';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_API_URL, courseUrl, userUrl } from './Url';
import { useIsFocused } from '@react-navigation/native'
import { Course, Stroke } from './CurrentGame';
import dayjs from 'dayjs';


interface Game {
    gameId: number,
    user: User,
    course: Course,
    startingDatetime: string,
    endingDatetime: string,
    strokes: Stroke[],
    steps: number
}
interface User {
    userId: number,
    username: string,
    password: string,
    role: string,
    totalThrowsThrown: number,
    totalSteps: number,
    totalTimePlayed: number,
    gamesPlayed: number,
    results: Result
}

interface Result {
    ACE: number,
    PAR: number,
    BIRDIE: number,
    EAGLE: number,
    ALBATROSS: number,
    BOGEY: number,
    DOUBLE_BOGEY: number,
    OVER_TRIPLE_BOGEY: number,
}

export default function Firstpage({ navigation }: { navigation: any }) {

    const [games, setGames] = useState<Game[]>([])

    const [repository, setRepository] = useState<User>({
        userId: 0,
        username: "",
        password: "",
        role: "",
        totalThrowsThrown: 0,
        totalSteps: 0,
        totalTimePlayed: 0,
        gamesPlayed: 0,
        results: {
            ACE: 0,
            PAR: 0,
            BIRDIE: 0,
            EAGLE: 0,
            ALBATROSS: 0,
            BOGEY: 0,
            DOUBLE_BOGEY: 0,
            OVER_TRIPLE_BOGEY: 0,
        }
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(MAIN_API_URL + 'users/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        setRepository(data);
        setLoading(false);
    }

    const fetchGame = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(MAIN_API_URL + `games/users/${repository.userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const game = await response.json();
        setGames(game)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const [game, setGame] = React.useState<Game>()

    const handleGameDialogOpen = (game: Game) => {
        setIsOpenThird(true)
        setGame(game)
    }

    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

    const [isOpenSecond, setIsOpenSecond] = React.useState(false);

    const onCloseSecond = () => setIsOpenSecond(false);

    const [isOpenThird, setIsOpenThird] = React.useState(false);

    const onCloseThird = () => setIsOpenThird(false);

    const isFocused = useIsFocused();
    useEffect(() => {
        fetchData()
    }, [isFocused])

    useEffect(() => {
        fetchGame()
    }, [repository])

    return (
        <View>
            <View style={styles.view}>
                <Button
                    _pressed={{ opacity: 0.5 }}
                    style={styles.button}
                    onPress={() => navigation.navigate('Peli')}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Aloita peli</Text>
                </Button>
                <Avatar style={styles.avatar} source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }} />
                {loading ?
                    <ActivityIndicator
                        size="small"
                        animating={loading} />
                    : (
                        <View style={styles.statsView}>
                            <View style={styles.statsHeaderUsernameView}>
                                <Text style={styles.statsHeaderUsername}>{repository.username}</Text>
                            </View>
                            <HStack space={2} justifyContent='center' flexWrap={'wrap'}>
                                <TouchableOpacity style={styles.singleStatViewFirst} onPress={() => setIsOpenSecond(!isOpenSecond)}>
                                    <Text style={styles.statsHeader}>
                                        Heitot:
                                    </Text>
                                    <Text style={styles.statsText}>
                                        {repository.totalThrowsThrown}
                                    </Text>
                                </TouchableOpacity>
                                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpenSecond} onClose={onCloseSecond} style={{ borderWidth: 2, borderColor: 'green' }}>
                                    <AlertDialog.Content>
                                        <AlertDialog.CloseButton />
                                        <AlertDialog.Header>
                                            <Text style={styles.alertText}>
                                                Heitot
                                            </Text>
                                        </AlertDialog.Header>

                                        <AlertDialog.Body>
                                            <VStack space={3} divider={<Divider />}>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Kokonaisheitot: {repository.totalThrowsThrown}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Hole-In-One: {repository.results.ACE}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Albatrossi: {repository.results.ALBATROSS}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Eagle: {repository.results.EAGLE}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Birdie: {repository.results.BIRDIE}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Par: {repository.results.PAR}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Bogey: {repository.results.BOGEY}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Tupla Bogey: {repository.results.DOUBLE_BOGEY}
                                                    </Text>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Text style={styles.alertText}>
                                                        Tripla Bogey: {repository.results.OVER_TRIPLE_BOGEY}
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </AlertDialog.Body>
                                    </AlertDialog.Content>
                                </AlertDialog>
                                <TouchableOpacity style={styles.singleStatView} onPress={() => setIsOpen(!isOpen)}>
                                    <Text style={styles.statsHeader}>
                                        Pelatut pelit:
                                    </Text>
                                    <Text style={styles.statsText}>
                                        {repository.gamesPlayed}
                                    </Text>
                                </TouchableOpacity>
                                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                                    <AlertDialog.Content>
                                        <AlertDialog.CloseButton />
                                        <AlertDialog.Header>
                                            <Text style={styles.alertText}>
                                                Pelatut pelit
                                            </Text>
                                        </AlertDialog.Header>
                                        <AlertDialog.Body>
                                            {games.map(game =>
                                                <TouchableOpacity key={game.gameId} onPress={() => handleGameDialogOpen(game)}>
                                                    <Box padding={3}>
                                                        <Text style={styles.alertText}>
                                                            {game.course.courseName}
                                                        </Text>
                                                        <Text style={styles.alertText}>
                                                            {dayjs(game.startingDatetime).format('DD.MM.YYYY HH:mm')}
                                                        </Text>
                                                    </Box>
                                                    <Divider />
                                                </TouchableOpacity>)}
                                        </AlertDialog.Body>
                                    </AlertDialog.Content>
                                </AlertDialog>
                                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpenThird} onClose={onCloseThird}>
                                    <AlertDialog.Content>
                                        <AlertDialog.CloseButton />
                                        <AlertDialog.Header>Peli</AlertDialog.Header>
                                        <AlertDialog.Body>
                                            <Box>
                                                <VStack space={3} divider={<Divider />}>
                                                    <Text style={styles.alertText}>
                                                        {game?.course.courseName}
                                                    </Text>
                                                    <Text style={styles.alertText}>
                                                        Aloitus: {dayjs(game?.startingDatetime).format('DD.MM.YYYY HH:mm')}
                                                    </Text>
                                                    <Text style={styles.alertText}>
                                                        Lopetus: {dayjs(game?.endingDatetime).format('DD.MM.YYYY HH:mm')}
                                                    </Text>
                                                    {game?.strokes.map(stroke =>
                                                        <Box key={stroke.strokeId} >
                                                            <Text style={styles.alertText}>
                                                                Väylä: {stroke.hole.holeNumber}
                                                            </Text>
                                                            <Text style={styles.alertText}>
                                                                Par: {stroke.hole.holePar}
                                                            </Text>
                                                            <Text style={styles.alertText}>
                                                                Tulos: {stroke.score}
                                                            </Text>
                                                        </Box>)}
                                                </VStack>
                                            </Box>
                                        </AlertDialog.Body>
                                        <AlertDialog.Footer>
                                            <Button isDisabled >Poista</Button>
                                        </AlertDialog.Footer>
                                    </AlertDialog.Content>
                                </AlertDialog>
                                <View style={styles.singleStatView}>
                                    <Text style={styles.statsHeader}>
                                        Askeleet:
                                    </Text>
                                    <Text style={styles.statsText}>
                                        {repository.totalSteps}
                                    </Text>
                                </View>
                                <View style={styles.singleStatView}>
                                    <Text style={styles.statsHeader}>
                                        Peliaika:
                                    </Text>
                                    <Text style={styles.statsText}>
                                        {repository.totalTimePlayed}
                                    </Text>
                                </View>
                            </HStack>
                        </View>
                    )}
            </View>
        </View>
    );
}