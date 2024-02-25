import React, { useEffect, useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import useControls from "r3f-native-orbitcontrols";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const o = new THREE.Object3D();

function Graph({ nodesData = [] }) {
  const ref = useRef();

  // Udate the location of ponit / node when there will be change in nodeData
  useEffect(() => {
    const updateMesh = () => {
      ref.current.instanceMatrix.needsUpdate = true;
      ref.current.geometry = ref.current.geometry;
      ref.current.instanceMatrix = ref.current.instanceMatrix;
    };

    nodesData.forEach(({ x, y, z }, i) => {
      o.position.set(x, y, z);
      o.updateMatrix();
      ref.current.setMatrixAt(i, o.matrix);
    });

    updateMesh();
  }, [nodesData]);

  // Set radius of a point / node as the number of data increases
  const radius =
    nodesData.length < 10_000
      ? 0.05
      : nodesData.length < 1_000_000
      ? 0.01
      : 0.0005;

  return (
    <group>
      <instancedMesh ref={ref} args={[null, null, nodesData.length]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial color="#3498db" />
      </instancedMesh>
    </group>
  );
}

const AppBar = ({ navigation, isLogoutRequired }) => {
  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.navigate("Authentication");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>Random Point Generator</Text>
      {isLogoutRequired && (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Home = () => {
  const webSocketRef = useRef(null);
  const [chunks, setChunks] = useState([]);
  const [OrbitControls, events] = useControls();
  const [nodesData, setNodesData] = useState([]);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(true);
  const navigation = useNavigation();

  const handleWebSocketMessage = useCallback((event) => {
    try {
      const receivedData = JSON.parse(event.data);

      if (Array.isArray(receivedData.dataUpdate)) {
        setChunks((prevChunks) => [...receivedData.dataUpdate]);
      } else {
        console.error(
          "Invalid message format. Received dataUpdate is not an array."
        );
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  }, []);

  const toggleWebSocket = () => {
    setIsWebSocketOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const setupWebSocket = () => {
      if (isWebSocketOpen) {
        const webSocketUrl = "ws://192.168.65.73:3000/points";
        webSocketRef.current = new WebSocket(webSocketUrl);

        webSocketRef.current.addEventListener(
          "message",
          handleWebSocketMessage
        );

        const cleanupWebSocket = () => {
          webSocketRef.current.removeEventListener(
            "message",
            handleWebSocketMessage
          );
          webSocketRef.current.close();
        };

        return cleanupWebSocket;
      }
    };

    const cleanupWebSocket = setupWebSocket();
    return cleanupWebSocket;
  }, [isWebSocketOpen, handleWebSocketMessage]);

  useEffect(() => {
    if (!isWebSocketOpen) return;

    setNodesData((prevData) => [
      ...prevData,
      ...chunks.flatMap((chunk) => chunk),
    ]);

    console.log("data : ", nodesData.length, " chunks : ", chunks.length);
    if (nodesData.length >= 5_000_000) {
      navigation.pop();
      navigation.navigate("Home");
    }
  }, [chunks, isWebSocketOpen]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar
        navigation={navigation}
        isLogoutRequired={chunks.length <= 5000}
      />
      <View style={{ flex: 1 }} {...events}>
        <Canvas>
          <OrbitControls minZoom={5} maxZoom={10} enablePan={false} />
          <Graph nodesData={nodesData} />
        </Canvas>
        {chunks.length <= 5000 && (
          <Button
            title={isWebSocketOpen ? "Stop Flow" : "Start Flow"}
            onPress={toggleWebSocket}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 10,
    height: 60,
    width: "100%",
    zIndex: 1,
  },
  appBarTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
  },
});

export default Home;
