---
slug: cv-tips
title: Practical Computer Vision Tips
date: 2025-10-27
excerpt: Lessons learned from CNNs, data aug, and training hygiene.
---

In this post, a few tips for CV workflows:

1. Normalize inputs consistently across train/val/test.
2. Prefer strong, realistic augmentations.
3. Keep an eye on class balance and use focal loss if needed.

A small math snippet for cross-entropy:

$$
\mathcal{L} = -\sum_i y_i \log(\hat{y}_i)
$$

Some code:

```python
import torch
import torch.nn.functional as F

def loss(logits, y):
    return F.cross_entropy(logits, y)
```
