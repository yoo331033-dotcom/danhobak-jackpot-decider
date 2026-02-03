import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar, Platform, Dimensions, ImageBackground } from 'react-native';
import Header from './components/Header';
import JackpotDisplay from './components/JackpotDisplay';
import SlotMachine from './components/SlotMachine';
import Lever from './components/Lever';
import ResultsModal from './components/ResultsModal';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [options, setOptions] = useState(['라멘', '돈가스', '마라탕']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    setModalVisible(false);

    setTimeout(() => {
      const valid = options.filter(o => o && o.trim().length > 0);
      const pool = valid.length > 0 ? valid : ['단호박'];
      const winner = pool[Math.floor(Math.random() * pool.length)];

      setResult(winner);
      setIsSpinning(false);

      setTimeout(() => {
        setModalVisible(true);
      }, 800);
    }, 2000);
  };

  const updateOption = (text, index) => {
    const newOpts = [...options];
    newOpts[index] = text;
    setOptions(newOpts);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 배경 그리드 패턴 */}
      <View style={styles.gridBackground} />

      {/* 플로팅 스티커들 */}
      <Text style={[styles.floatingEmoji, { top: 80, left: 20 }]}>👾</Text>
      <Text style={[styles.floatingEmoji, { top: 150, right: 20 }]}>💿</Text>
      <Text style={[styles.floatingEmoji, { bottom: 200, left: 15 }]}>🔥</Text>
      <Text style={[styles.floatingEmoji, { bottom: 280, right: 15 }]}>💊</Text>

      {/* 코너 장식 */}
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerBottomRight} />

      {/* 장식 도형들 */}
      <View style={styles.decorSquare} />
      <View style={styles.decorCircle} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <Header />

        {/* 잭팟 디스플레이 */}
        <JackpotDisplay />

        {/* 슬롯 + 레버 */}
        <View style={styles.mainSection}>
          <View style={styles.slotWrapper}>
            <SlotMachine
              options={options}
              isSpinning={isSpinning}
              result={result}
              onOptionChange={updateOption}
            />
          </View>

          <View style={styles.leverWrapper}>
            <Lever onPull={handleSpin} isSpinning={isSpinning} />
          </View>
        </View>

        {/* 옵션 입력 섹션 */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Text style={styles.sectionTitle}>🎯 OPTIONS</Text>
            <View style={styles.dotsRow}>
              <View style={[styles.dot, { backgroundColor: '#ff4444' }]} />
              <View style={[styles.dot, { backgroundColor: '#ffcc00' }]} />
              <View style={[styles.dot, { backgroundColor: '#44ff44' }]} />
            </View>
          </View>

          {options.map((opt, idx) => (
            <TextInput
              key={idx}
              style={styles.input}
              value={opt}
              onChangeText={(t) => updateOption(t, idx)}
              placeholder={`항목 ${idx + 1}`}
              placeholderTextColor="#999"
              editable={!isSpinning}
            />
          ))}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => setOptions(['', '', ''])}
            >
              <Text style={styles.resetBtnText}>RESET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 푸터 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 🎃 by DANHOBAK</Text>
        </View>

      </ScrollView>

      {/* 결과 모달 */}
      <ResultsModal
        visible={modalVisible}
        winner={result}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6e3',
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fdf6e3',
    // 그리드 패턴은 React Native에서 직접 구현 어려우므로 생략
  },
  floatingEmoji: {
    position: 'absolute',
    fontSize: 40,
    opacity: 0.7,
    zIndex: 0,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    borderRightWidth: 30,
    borderBottomWidth: 30,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopWidth: 30,
    borderLeftWidth: 30,
    borderTopColor: '#ccff00',
    borderLeftColor: '#ccff00',
    opacity: 0.5,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRightWidth: 30,
    borderBottomWidth: 30,
    borderRightColor: '#ff0099',
    borderBottomColor: '#ff0099',
    borderTopWidth: 30,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    opacity: 0.5,
  },
  decorSquare: {
    position: 'absolute',
    top: 120,
    left: 60,
    width: 40,
    height: 40,
    backgroundColor: '#ccff00',
    borderWidth: 3,
    borderColor: '#000',
    transform: [{ rotate: '45deg' }],
    opacity: 0.6,
    zIndex: 0,
  },
  decorCircle: {
    position: 'absolute',
    bottom: 150,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#000',
    borderStyle: 'dashed',
    backgroundColor: '#00f0ff',
    opacity: 0.4,
    zIndex: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    zIndex: 10,
  },
  mainSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 30,
    paddingRight: 20,
  },
  slotWrapper: {
    flex: 1,
    maxWidth: 320,
    zIndex: 10,
  },
  leverWrapper: {
    marginLeft: -20,
    marginTop: 50,
    zIndex: 20,
  },
  inputSection: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 4,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
  },
  input: {
    borderWidth: 3,
    borderColor: '#000',
    padding: 15,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#000',
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },
  resetBtn: {
    flex: 1,
    padding: 15,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    alignItems: 'center',
  },
  resetBtnText: {
    fontWeight: '900',
    fontSize: 12,
    color: '#000',
    letterSpacing: 1,
  },
  saveBtn: {
    flex: 1,
    padding: 15,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#000',
    shadowColor: '#ccff00',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    alignItems: 'center',
  },
  saveBtnText: {
    fontWeight: '900',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 30,
    padding: 15,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
  },
});
