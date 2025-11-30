---
sidebar_position: 4
title: Building ROS 2 Packages with Python (rclpy)
---

# Building ROS 2 Packages with Python (rclpy)

## Introduction

Python is a popular language for robotics due to its simplicity and extensive libraries. ROS 2 provides `rclpy`, a client library for Python, enabling seamless integration of Python scripts with the ROS 2 ecosystem. This section will guide you through building ROS 2 packages using Python and `rclpy` to interface with ROS controllers.

## ROS 2 Packages and Workspace

In ROS 2, functionality is organized into **packages**. A package is a directory containing source code, build scripts, configuration files, and other resources. Multiple packages are typically organized within a **workspace**.

### Creating a Workspace

First, create a ROS 2 workspace:

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/
colcon build
```

### Creating a New Python Package

To create a new Python package within your workspace:

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_python_pkg
```

This command creates a directory named `my_python_pkg` with a basic structure.

## Writing Python Nodes with rclpy

A Python node using `rclpy` typically involves:

1.  **Importing `rclpy`**: `import rclpy`
2.  **Initializing ROS 2**: `rclpy.init(args=args)`
3.  **Creating a node**: `node = rclpy.create_node('my_node_name')`
4.  **Implementing logic**: Publishers, subscribers, service servers, service clients.
5.  **Spinning the node**: `rclpy.spin(node)` (keeps the node alive and processing events)
6.  **Shutting down ROS 2**: `node.destroy_node()` and `rclpy.shutdown()`

### Example: A Simple Publisher Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS 2: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Bridging Python Agents to ROS Controllers

`rclpy` allows Python-based AI agents (e.g., planning algorithms, reinforcement learning agents) to publish commands to ROS 2 topics (e.g., motor commands) or call ROS 2 services (e.g., for complex motion planning). Conversely, agents can subscribe to sensor data topics to perceive the robot's environment.

This integration is key for developing intelligent robotic behaviors using advanced AI techniques in Python.

## Build and Run

After writing your Python node, you need to build your workspace:

```bash
cd ~/ros2_ws
colcon build --packages-select my_python_pkg
```

And then source your workspace and run your node:

```bash
source install/setup.bash
ros2 run my_python_pkg minimal_publisher
```
