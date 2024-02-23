import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import SplashScreen from './SplashScreen';

const predefinedColors = [
  '#3498db',
  '#2ecc71',
  '#e74c3c',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#d35400',
  '#c0392b',
  '#34495e',
  '#f1c40f',
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[randomIndex];
}

const MemoizedRoundedShape = React.memo(({ position, scale, color }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh position={position} ref={mesh} scale={scale}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} />
    </mesh>
  );
});

const TopBar = () => (
  <View style={styles.topBar}></View>
);

const AppBar = ({ handleLogout }) => (
  <View style={styles.appBar}>
    <Text style={styles.appBarTitle}>Random Point Generator</Text>
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const CanvasComponent = React.memo(({ graphData }) => (
  <React.Suspense fallback={null}>
    <Canvas camera={{ position: [0, 0, 15] }} backgroundColor="white">
      <MemoizedRoundedShape position={[0, 0, 0]} color="#3498db" scale={1} />
      {graphData.map((point, index) => (
        <MemoizedRoundedShape key={index} position={[point.x, point.y, point.z]} scale={0.2} color={getRandomColor()} />
      ))}
    </Canvas>
  </React.Suspense>
));

const BottomBar = ({ stopContinueFlow, isGenerating }) => (
  <View style={styles.bottomBar}>
    <TouchableOpacity onPress={stopContinueFlow} style={styles.button}>
      <Text style={styles.buttonText}>{isGenerating ? 'Stop Flow' : 'Start Flow'}</Text>
    </TouchableOpacity>
  </View>
);

const Home = () => {
  const navigation = useNavigation();
  const [graphData, setGraphData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isWebSocketConnecting, setIsWebSocketConnecting] = useState(true);
  const webSocketRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isGenerating) {
      const webSocketUrl = 'ws://192.168.65.73:3000/points';
      webSocketRef.current = new WebSocket(webSocketUrl);

      webSocketRef.current.onopen = () => {
        setIsWebSocketConnecting(false);
      };

      webSocketRef.current.addEventListener('message', (event) => {
        const receivedData = JSON.parse(event.data);
        setGraphData((prevGraphData) => [...receivedData].slice(-2000));
      });

      return () => {
        webSocketRef.current.close();
      };
    }
  }, [isGenerating]);

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.navigate('Authentication');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const stopContinueFlow = () => {
    setIsGenerating((prevIsGenerating) => !prevIsGenerating);
    if (webSocketRef.current && isGenerating) {
      webSocketRef.current.send(JSON.stringify({ type: 'stop' }));
    }
  };

  if (showSplash || isWebSocketConnecting || graphData.length === 0) {
    return (
      <SplashScreen />
    );
  }

  return (
    <>
      <TopBar />
      <AppBar handleLogout={handleLogout} />
      <CanvasComponent graphData={graphData} />
      <BottomBar stopContinueFlow={stopContinueFlow} isGenerating={isGenerating} />
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    width: '100%',
    zIndex: 1,
  },
  appBarTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;
