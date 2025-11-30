---
sidebar_position: 5
title: Understanding URDF (Unified Robot Description Format) for Humanoids
---

# Understanding URDF (Unified Robot Description Format) for Humanoids

## Introduction

The Unified Robot Description Format (URDF) is an XML format used in ROS to describe all aspects of a robot. This includes its kinematic and dynamic properties, visual appearance, and collision models. For humanoid robots, URDF files become particularly complex due to the intricate structure and many degrees of freedom.

## URDF Basics

A URDF file is composed of `<link>` and `<joint>` elements:

*   **`<link>`**: Describes a rigid body segment of the robot (e.g., torso, upper arm, forearm). It contains information about the link's mass, inertia, visual mesh, and collision geometry.
*   **`<joint>`**: Describes the kinematic and dynamic properties of the connection between two links. It defines the type of joint (e.g., `revolute`, `prismatic`, `fixed`), its axis of rotation, limits, and parent/child links.

## Key Elements for Humanoids

Humanoid robots require a detailed URDF description to accurately model their anthropomorphic structure.

### Kinematics and Dynamics

*   **Links**: Each body part (head, neck, torso, pelvis, upper leg, lower leg, foot, upper arm, forearm, hand) is typically represented as a separate link.
*   **Joints**: Connect these links, often `revolute` joints for rotational movement (e.g., at the shoulder, elbow, knee) and `fixed` joints for rigidly connected parts.
*   **Degrees of Freedom (DoF)**: Humanoids have a high number of DoF, requiring many joints to be defined.

### Visuals and Collisions

*   **`<visual>`**: Defines the visual representation of the link, often by referencing 3D mesh files (e.g., `.stl`, `.dae`). This is what you see in simulators like Gazebo.
*   **`<collision>`**: Defines the collision geometry of the link. This is crucial for physics simulation and obstacle avoidance. It is often a simplified shape (e.g., box, cylinder, sphere) to reduce computational load.

## URDF for Humanoids Challenges

*   **Complexity**: Describing a humanoid's many links and joints manually can be tedious and error-prone.
*   **Self-Collision**: Humanoid robots can easily self-collide (e.g., an arm hitting the torso). Careful collision model definition and self-collision checking are essential.
*   **Balance and Stability**: While URDF describes the physical properties, achieving balance and stable locomotion requires complex control algorithms built on top of the URDF model.

## Xacro for Simplified URDF

For complex robots like humanoids, Xacro (XML Macros) is often used to simplify URDF files. Xacro allows for:

*   **Macros**: Reusable blocks of XML code.
*   **Parameters**: Define values that can be passed to macros.
*   **Mathematical Expressions**: Calculate values dynamically.

This greatly reduces redundancy and improves readability in humanoid robot descriptions.
