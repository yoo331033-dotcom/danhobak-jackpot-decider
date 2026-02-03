import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            {/* 배경 장식 원 */}
            <View style={styles.decorCircle} />

            <View style={styles.leftSection}>
                <View style={styles.iconBox}>
                    <Text style={styles.iconText}>🎮</Text>
                </View>
                <View>
                    <Text style={styles.title}>단호박</Text>
                    <Text style={styles.subtitle}>No more thinking!</Text>
                </View>
            </View>

            <View style={styles.rightSection}>
                <View style={styles.liveBox}>
                    <Text style={styles.liveDot}>●</Text>
                    <Text style={styles.liveText}>LIVE</Text>
                </View>
                <View style={styles.avatarBox}>
                    <Text style={styles.avatarEmoji}>😎</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 20,
        overflow: 'hidden',
    },
    decorCircle: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 60,
        height: 60,
        backgroundColor: '#ccff00',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000',
        opacity: 0.6,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        zIndex: 10,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ccff00',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    iconText: {
        fontSize: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#000',
        letterSpacing: -2,
    },
    subtitle: {
        fontSize: 11,
        color: '#ff0099',
        fontWeight: 'bold',
        transform: [{ rotate: '-1deg' }],
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        zIndex: 10,
    },
    liveBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 5,
        shadowColor: '#ccff00',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    liveDot: {
        color: '#ccff00',
        fontSize: 8,
    },
    liveText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: 'bold',
    },
    avatarBox: {
        width: 36,
        height: 36,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    avatarEmoji: {
        fontSize: 18,
    },
});

export default Header;
