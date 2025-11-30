---
sidebar_position: 3
title: ROS 2 Nodes, Topics, and Services
---

# ROS 2 Nodes, Topics, and Services

## Introduction

ROS 2 (Robot Operating System 2) is built around a distributed architecture where independent processes, called **Nodes**, communicate with each other. This communication primarily happens through **Topics** and **Services**. Understanding these core concepts is crucial for developing robust robotic applications.

## Nodes

A **Node** is an executable process that performs a specific task within the ROS 2 system. For example, one node might be responsible for reading data from a sensor, another for processing that data, and a third for sending commands to a motor.

*   **Key Characteristics:**
    *   **Modular:** Each node performs a specific function, making the system modular and easier to debug and maintain.
    *   **Independent:** Nodes can run on different machines and still communicate seamlessly.
    *   **Reusable:** Well-designed nodes can be reused in different robotic projects.

## Topics

**Topics** are the primary mechanism for asynchronous, many-to-many, publish-subscribe communication in ROS 2. Nodes publish messages to topics, and other nodes can subscribe to those topics to receive the messages.

*   **Communication Model:** Publish-Subscribe (one-to-many, many-to-many)
*   **Data Flow:** Unidirectional (publisher sends, subscriber receives)
*   **Use Cases:** Continuous data streams like sensor readings (e.g., camera images, LiDAR scans, odometry data), motor commands, and status updates.

## Services

**Services** are used for synchronous, request-response communication between nodes. A client node sends a request to a service, and a server node performs the requested operation and sends a response back to the client.

*   **Communication Model:** Request-Response (one-to-one)
*   **Data Flow:** Bidirectional (request and response)
*   **Use Cases:** Operations that require an immediate response, such as triggering a specific action (e.g., "take a picture," "move to a specific joint angle"), querying a database, or performing a computation.
