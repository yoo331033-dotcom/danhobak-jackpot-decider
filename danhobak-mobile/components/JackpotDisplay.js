import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JackpotDisplay = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                {/* 단 */}
                <View style={[styles.charWrapper, { transform: [{ rotate: '-6deg' }] }]}>
                    <Text style={[styles.char, styles.charShadowGreen, { position: 'absolute', left: 2, top: 2 }]}>단</Text>
                    <Text style={[styles.char, styles.charShadowPink, { position: 'absolute', left: -2, top: -2 }]}>단</Text>
                    <Text style={[styles.char, styles.charBlack]}>단</Text>
                </View>

                {/* 호 */}
                <View style={[styles.charWrapper, { transform: [{ rotate: '3deg' }], marginLeft: -10 }]}>
                    <Text style={[styles.char, styles.charShadowBlue, { position: 'absolute', left: 2, top: 2 }]}>호</Text>
                    <Text style={[styles.char, styles.charBlack]}>호</Text>
                </View>

                {/* 박 */}
                <View style={[styles.charWrapper, { transform: [{ rotate: '-2deg' }], marginLeft: -10 }]}>
                    <Text style={[styles.char, styles.charShadowGreen, { position: 'absolute', left: 2, top: 2 }]}>박</Text>
                    <Text style={[styles.char, styles.charShadowPink, { position: 'absolute', left: -2, top: -2, opacity: 0.5 }]}>박</Text>
                    <Text style={[styles.char, styles.charBlack]}>박</Text>
                </View>
            </View>

            {/* 장식 아이콘 */}
            <Text style={styles.sparkle}>✨</Text>
            <Text style={styles.bolt}>⚡</Text>

            {/* DECIDER 태그 */}
            <View style={styles.deciderWrapper}>
                <View style={styles.deciderBox}>
                    <Text style={styles.deciderText}>DECIDER</Text>
                    <View style={styles.shimmerBar}>
                        <View style={styles.shimmerFill} />
                    </View>
                </View>
                <View style={styles.cornerWhite} />
                <View style={styles.cornerBlue} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
    },
    charWrapper: {
        position: 'relative',
        width: 70,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    char: {
        fontSize: 70,
        fontWeight: '900',
        fontStyle: 'italic',
        letterSpacing: -5,
    },
    charBlack: {
        color: '#000',
    },
    charShadowGreen: {
        color: '#ccff00',
    },
    charShadowPink: {
        color: '#ff0099',
    },
    charShadowBlue: {
        color: '#00f0ff',
    },
    sparkle: {
        position: 'absolute',
        top: 0,
        right: 30,
        fontSize: 25,
    },
    bolt: {
        position: 'absolute',
        bottom: 50,
        left: 30,
        fontSize: 20,
        color: '#ff0099',
    },
    deciderWrapper: {
        marginTop: 15,
        transform: [{ rotate: '1deg' }],
        position: 'relative',
    },
    deciderBox: {
        backgroundColor: '#000',
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderWidth: 3,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        alignItems: 'center',
    },
    deciderText: {
        color: '#ccff00',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 5,
        fontStyle: 'italic',
    },
    shimmerBar: {
        height: 3,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginTop: 5,
        borderRadius: 2,
        overflow: 'hidden',
    },
    shimmerFill: {
        height: '100%',
        width: '66%',
        backgroundColor: '#ff0099',
    },
    cornerWhite: {
        position: 'absolute',
        left: -6,
        bottom: -6,
        width: 12,
        height: 12,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        transform: [{ rotate: '45deg' }],
        zIndex: -1,
    },
    cornerBlue: {
        position: 'absolute',
        right: -6,
        top: -6,
        width: 12,
        height: 12,
        backgroundColor: '#00f0ff',
        borderWidth: 2,
        borderColor: '#000',
        transform: [{ rotate: '-12deg' }],
        zIndex: -1,
    },
});

export default JackpotDisplay;
