import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons'

import styles from './styles';

function TeacherList() {
    const [isFiltersVisible, setIsFilterVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites')
            .then((response) => {
                if (response) {
                    const favoritedTeachers = JSON.parse(response)
                    const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                        return teacher.id
                    })

                    setFavorites(favoritedTeachersIds)
                }
            });
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites()
        }, [])
    )

    function handleToggleFilterVisible () {
        setIsFilterVisible(!isFiltersVisible)
    }

    async function handleFilterSubmit(){
        let weekDays

        switch (week_day) {
            case 'Domingo':
                weekDays = 0
                break;
        
            case 'Segunda-feira':
                weekDays = 1
                break;
        
            case 'Terça-feira':
                weekDays = 2
                break;
        
            case 'Quarta-feira':
                weekDays = 3
                break;
        
            case 'Quinta-feira':
                weekDays = 4
                break;
        
            case 'Sexta-feira':
                weekDays = 5
                break;
        
            case 'Sábado':
                weekDays = 6
                break;
        
            default:
                weekDays = 0
                break;
        }

        loadFavorites()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day: weekDays,
                time,
            }
        });

        setIsFilterVisible(false)
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton>
                        <Feather onPress={handleToggleFilterVisible} name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                {
                    isFiltersVisible && (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput
                                value={subject}
                                onChangeText={text => setSubject(text)}
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                placeholder="Qual a matéria?"
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        placeholderTextColor="#c1bccc"
                                        style={styles.input}
                                        placeholder="Qual o dia?"
                                    />
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        placeholderTextColor="#c1bccc"
                                        style={styles.input}
                                        placeholder="Qual o horário?"
                                    />
                                </View>
                            </View>
                                <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Filtrar</Text>
                                </RectButton>
                        </View>
                    )
                }
            </PageHeader>

            <ScrollView style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {teachers.map( (teacher:Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;