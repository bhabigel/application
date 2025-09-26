import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    About,
    Achievments,
    Classes,
    Contact,
    Events,
    Footer,
    Navbar,
    Opening,
    Starting,
} from '../../../components/home';

const HomeScreen = () => {
    const {language} = useLanguage();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Navbar />
                <Opening />
                <About language={language}/>
                <Achievments />
                <Classes />
                <Events />
                <Starting />
                <Contact />
                <Footer />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 32,
    },
});

export default HomeScreen;
